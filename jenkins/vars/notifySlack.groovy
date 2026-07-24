def call(String status, String channel = '#deployments') {
    def color = '#CCCCCC'
    def emoji = ':point_right:'

    if (status == 'SUCCESS') {
        color = '#00FF00'
        emoji = ':white_check_mark:'
    } else if (status == 'FAILURE') {
        color = '#FF0000'
        emoji = ':x:'
    } else if (status == 'UNSTABLE') {
        color = '#FFA500'
        emoji = ':warning:'
    }

    def message = "${emoji} Build *${env.JOB_NAME}* [#${env.BUILD_NUMBER}] - Status: *${status}*\nURL: ${env.BUILD_URL}"

    echo "[Slack Notification] ${status} -> ${channel}"
    // Uncomment when Slack plugin is configured in Jenkins:
    // slackSend channel: channel, color: color, message: message
}
