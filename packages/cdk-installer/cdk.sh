#!/bin/sh

export OPERATOR_NAME="SvelteUpAdmin"
export OPERATOR_PREFIX="SupAdminOp-"
export OPERATOR_STATE_MACHINE_NAME="SupAdminOperator-MainStateMachine"

pnpm install --frozen-lockfile

pnpx cdk@next --require-approval never $@