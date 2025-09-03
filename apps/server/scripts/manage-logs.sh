#!/bin/bash

# Script para gerenciar logs do servidor
# Uso: ./scripts/manage-logs.sh [comando]

LOG_DIR="logs"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_DIR_PATH="$PROJECT_ROOT/$LOG_DIR"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mostrar ajuda
show_help() {
    echo -e "${BLUE}Gerenciador de Logs do Servidor${NC}"
    echo ""
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  status     - Mostra status dos logs"
    echo "  tail       - Mostra logs em tempo real"
    echo "  errors     - Mostra apenas logs de erro"
    echo "  http       - Mostra apenas logs HTTP"
    echo "  clean      - Remove logs antigos"
    echo "  archive    - Arquiva logs antigos"
    echo "  help       - Mostra esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 status"
    echo "  $0 tail"
    echo "  $0 errors | head -20"
}

# Função para verificar se o diretório de logs existe
check_log_dir() {
    if [ ! -d "$LOG_DIR_PATH" ]; then
        echo -e "${YELLOW}Diretório de logs não encontrado: $LOG_DIR_PATH${NC}"
        echo "Execute o servidor primeiro para gerar logs."
        exit 1
    fi
}

# Função para mostrar status dos logs
show_status() {
    check_log_dir
    
    echo -e "${BLUE}📊 Status dos Logs${NC}"
    echo "Diretório: $LOG_DIR_PATH"
    echo ""
    
    # Mostrar arquivos de log
    echo -e "${GREEN}Arquivos de Log:${NC}"
    ls -la "$LOG_DIR_PATH" | grep -E "\.(log|gz)$" | while read line; do
        echo "  $line"
    done
    
    echo ""
    
    # Mostrar tamanho dos logs
    echo -e "${GREEN}Tamanho dos Logs:${NC}"
    du -h "$LOG_DIR_PATH"/*.log 2>/dev/null | sort -hr | while read line; do
        echo "  $line"
    done
    
    echo ""
    
    # Mostrar estatísticas
    echo -e "${GREEN}Estatísticas:${NC}"
    if [ -f "$LOG_DIR_PATH/application-$(date +%Y-%m-%d).log" ]; then
        local total_lines=$(wc -l < "$LOG_DIR_PATH/application-$(date +%Y-%m-%d).log")
        echo "  Linhas hoje: $total_lines"
    fi
    
    if [ -f "$LOG_DIR_PATH/error-$(date +%Y-%m-%d).log" ]; then
        local error_lines=$(wc -l < "$LOG_DIR_PATH/error-$(date +%Y-%m-%d).log")
        echo "  Erros hoje: $error_lines"
    fi
}

# Função para mostrar logs em tempo real
tail_logs() {
    check_log_dir
    
    echo -e "${BLUE}📝 Logs em Tempo Real${NC}"
    echo "Pressione Ctrl+C para parar"
    echo ""
    
    # Mostrar logs de todas as aplicações
    tail -f "$LOG_DIR_PATH"/*.log
}

# Função para mostrar apenas logs de erro
show_errors() {
    check_log_dir
    
    echo -e "${BLUE}❌ Logs de Erro${NC}"
    echo ""
    
    # Mostrar erros do arquivo de hoje
    local error_file="$LOG_DIR_PATH/error-$(date +%Y-%m-%d).log"
    if [ -f "$error_file" ]; then
        echo "Arquivo: $error_file"
        echo ""
        cat "$error_file"
    else
        echo -e "${YELLOW}Nenhum arquivo de erro encontrado para hoje${NC}"
    fi
}

# Função para mostrar apenas logs HTTP
show_http() {
    check_log_dir
    
    echo -e "${BLUE}🌐 Logs HTTP${NC}"
    echo ""
    
    # Mostrar logs HTTP do arquivo de hoje
    local http_file="$LOG_DIR_PATH/http-$(date +%Y-%m-%d).log"
    if [ -f "$http_file" ]; then
        echo "Arquivo: $http_file"
        echo ""
        cat "$http_file"
    else
        echo -e "${YELLOW}Nenhum arquivo HTTP encontrado para hoje${NC}"
    fi
}

# Função para limpar logs antigos
clean_logs() {
    check_log_dir
    
    echo -e "${BLUE}🧹 Limpando Logs Antigos${NC}"
    echo ""
    
    # Remover logs com mais de 30 dias
    find "$LOG_DIR_PATH" -name "*.log" -mtime +30 -delete
    find "$LOG_DIR_PATH" -name "*.gz" -mtime +30 -delete
    
    echo -e "${GREEN}Logs antigos removidos com sucesso!${NC}"
}

# Função para arquivar logs antigos
archive_logs() {
    check_log_dir
    
    echo -e "${BLUE}📦 Arquivando Logs Antigos${NC}"
    echo ""
    
    # Criar diretório de arquivo se não existir
    local archive_dir="$LOG_DIR_PATH/archive"
    mkdir -p "$archive_dir"
    
    # Mover logs antigos para arquivo
    find "$LOG_DIR_PATH" -name "*.log" -mtime +7 -exec mv {} "$archive_dir/" \;
    find "$LOG_DIR_PATH" -name "*.gz" -mtime +7 -exec mv {} "$archive_dir/" \;
    
    echo -e "${GREEN}Logs arquivados em: $archive_dir${NC}"
}

# Função principal
main() {
    case "${1:-help}" in
        "status")
            show_status
            ;;
        "tail")
            tail_logs
            ;;
        "errors")
            show_errors
            ;;
        "http")
            show_http
            ;;
        "clean")
            clean_logs
            ;;
        "archive")
            archive_logs
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Executar função principal
main "$@"
