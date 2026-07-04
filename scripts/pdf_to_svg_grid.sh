#!/bin/bash
# Script para extrair esboços (sketches) em grade 3x3 de um PDF e converter para SVG vetorial.
# Dependências: pdftocairo, imagemagick (convert), e potrace (incluso em bin/potrace)

if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <arquivo.pdf> <prefixo_saida>"
    echo "Exemplo: $0 imgs/Lakatos.pdf lakatos"
    exit 1
fi

PDF_FILE="$1"
PREFIX="$2"
BIN_DIR="$(dirname "$0")/bin"

if [ ! -f "$PDF_FILE" ]; then
    echo "Erro: Arquivo $PDF_FILE não encontrado."
    exit 1
fi

echo "1. Extraindo PDF para PNG..."
pdftocairo -png -f 1 -l 1 "$PDF_FILE" /tmp/temp_page
PAGE_PNG="/tmp/temp_page-1.png"

echo "2. Recortando em 9 partes (grade 3x3) e ajustando contraste..."
# -crop 3x3@ divide exatamente em 9 partes iguais
# -threshold 50% deixa a imagem estritamente em preto e branco (ideal para esboços)
# -trim +repage remove as margens brancas ao redor do desenho
convert "$PAGE_PNG" -threshold 50% -crop 3x3@ +repage -fuzz 5% -trim +repage /tmp/temp_piece_%d.bmp

echo "3. Vetorizando cada parte com potrace..."
for i in {0..8}; do
    OUT_FILE="imgs/${PREFIX}-$((i+1)).svg"
    "$BIN_DIR/potrace" -s -o "$OUT_FILE" "/tmp/temp_piece_$i.bmp"
    echo "   -> Gerado: $OUT_FILE"
done

echo "Limpando arquivos temporários..."
rm -f /tmp/temp_page* /tmp/temp_piece*

echo "Concluído com sucesso! Os recortes vetorizados estão na pasta imgs/"
