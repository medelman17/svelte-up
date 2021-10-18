# Control Plane (Internal Account)

Registers new starts, etc. Creates and maintains central services in user-level/accounts. Provides centralized logging and telemetry. Supports pretty urls under the `svelteup.io` domain for user project deployments without custom domains.

When a user initializes SvelteUp in an AWS account for the first time, the control plane initiates a step-function-driven multi-phase bootstrapping process. User must grant ability for control plane to assume IAM role in user account with sufficient permissions.

# Central Services (User Account)

Serves as the user-level/account control plane for SvelteUp deployments. Responsible for CI/CD vis-a-vis project-level resources. Auto configures pipelines for project-level deployments based on build artifacts.

# Project-Level Resources (User Account)

Although not ideal from a "well-architected" best-practices perspective, users should be able to host multiple SvelteUp-based deployments in a single AWS account.
