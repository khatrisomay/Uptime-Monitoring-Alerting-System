import logging
import httpx
from typing import Optional

logger = logging.getLogger("uptime_notifications")

async def send_webhook_alert(webhook_url: str, service_name: str, service_url: str, status: str, ping_ms: int):
    """
    Sends a formatted JSON alert payload to Slack, Discord, or generic Webhooks.
    """
    if not webhook_url:
        return

    is_down = status == "DOWN"
    emoji = "🚨" if is_down else "✅"
    color = 15158332 if is_down else 3066993  # Red or Green in Discord decimal

    payload = {
        "text": f"{emoji} *Service Alert*: `{service_name}` is currently *{status}*!\nURL: {service_url}\nResponse Time: {ping_ms}ms",
        "embeds": [
            {
                "title": f"{emoji} Uptime Monitor Alert: {service_name}",
                "description": f"Target `{service_url}` status transitioned to **{status}**.",
                "color": color,
                "fields": [
                    {"name": "Status", "value": status, "inline": True},
                    {"name": "Response Latency", "value": f"{ping_ms} ms", "inline": True}
                ]
            }
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            await client.post(webhook_url, json=payload)
            logger.info(f"Alert sent to webhook for {service_name} ({status})")
    except Exception as e:
        logger.error(f"Failed to send webhook alert for {service_name}: {e}")
