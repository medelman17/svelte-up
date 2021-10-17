#!/bin/sh

export OPERATOR_NAME="SvelteUpStatic"
export OPERATOR_PREFIX="SupStaticOp-"
export OPERATOR_STATE_MACHINE_NAME="SupStaticOperator-MainStateMachine"

pnpm install --frozen-lockfile

pnpx cdk@next --require-approval never $@