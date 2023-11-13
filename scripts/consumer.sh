#!/bin/bash

amqp-consume --queue-name "${QUEUE_NAME}" \
  --host "${HOST}" --port "${PORT}" \
  --ssl --vhost shared --creds "${API_KEY}"
