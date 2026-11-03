#!/usr/bin/env bash
# Build de verificação em .next-prod e servidor na porta 3123 (não interfere no `next dev`).
cd "$(dirname "$0")/.."
PID=$(lsof -ti tcp:3123 2>/dev/null || fuser 3123/tcp 2>/dev/null)
[ -n "$PID" ] && kill $PID 2>/dev/null
NEXT_DIST_DIR=.next-prod npx next build 2>&1 | grep -Ei "error|warn|✓ Compiled"
(NEXT_DIST_DIR=.next-prod nohup npx next start -p 3123 > /dev/null 2>&1 &)
sleep 4
