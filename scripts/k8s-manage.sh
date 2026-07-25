#!/usr/bin/env bash
# ==============================================================================
# Uptime Monitor - Kubernetes Pod & Resource Manager CLI
# ==============================================================================

set -e

NAMESPACE="${NAMESPACE:-default}"
K8S_DIR="deployments/k8s"

usage() {
    echo "Usage: $0 {apply|status|pods|logs|scale|restart|delete}"
    echo "  apply   : Deploy all Kubernetes manifests"
    echo "  status  : View deployment status and rollout status"
    echo "  pods    : List all active pods and resource usage"
    echo "  logs    : Stream backend pod logs"
    echo "  scale   : Scale deployments (Usage: $0 scale backend 5)"
    echo "  restart : Perform zero-downtime pod restart"
    echo "  delete  : Delete all deployed resources"
    exit 1
}

case "$1" in
    apply)
        echo "Applying Kubernetes manifests to namespace [${NAMESPACE}]..."
        kubectl apply -f ${K8S_DIR}/namespaces/ --namespace="${NAMESPACE}" 2>/dev/null || true
        kubectl apply -f ${K8S_DIR}/configmaps/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/secrets/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/storage/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/backend/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/frontend/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/hpa/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/pdb/ --namespace="${NAMESPACE}"
        kubectl apply -f ${K8S_DIR}/ingress/ --namespace="${NAMESPACE}"
        echo "Manifests applied successfully."
        ;;
    status)
        echo "Checking rollout status for backend and frontend..."
        kubectl rollout status deployment/uptime-monitor-backend --namespace="${NAMESPACE}"
        kubectl rollout status deployment/uptime-monitor-frontend --namespace="${NAMESPACE}"
        ;;
    pods)
        echo "Listing pods in namespace [${NAMESPACE}]:"
        kubectl get pods -o wide --namespace="${NAMESPACE}"
        ;;
    logs)
        echo "Streaming logs for backend pods..."
        kubectl logs -f -l app=uptime-monitor-backend --namespace="${NAMESPACE}" --all-containers=true
        ;;
    scale)
        TARGET="${2:-backend}"
        REPLICAS="${3:-3}"
        echo "Scaling uptime-monitor-${TARGET} to ${REPLICAS} replicas..."
        kubectl scale deployment "uptime-monitor-${TARGET}" --replicas="${REPLICAS}" --namespace="${NAMESPACE}"
        ;;
    restart)
        echo "Restarting pods with rollout..."
        kubectl rollout restart deployment/uptime-monitor-backend --namespace="${NAMESPACE}"
        kubectl rollout restart deployment/uptime-monitor-frontend --namespace="${NAMESPACE}"
        ;;
    delete)
        echo "Deleting all Kubernetes resources..."
        kubectl delete -f ${K8S_DIR}/ingress/ --namespace="${NAMESPACE}" 2>/dev/null || true
        kubectl delete -f ${K8S_DIR}/frontend/ --namespace="${NAMESPACE}" 2>/dev/null || true
        kubectl delete -f ${K8S_DIR}/backend/ --namespace="${NAMESPACE}" 2>/dev/null || true
        echo "Resources cleaned up."
        ;;
    *)
        usage
        ;;
esac
