#!/bin/sh

export ACCOUNT_ID=$(sts get-caller-identity --output text --query Account)