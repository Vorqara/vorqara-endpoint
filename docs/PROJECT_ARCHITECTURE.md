# Vorqara Endpoint Protection Platform
## Project Architecture & Engineering Standards

**Version:** 0.2  
**Status:** Active Development  
**Target Beta:** January 2027

---

# Vision

Vorqara is an enterprise Endpoint Protection Platform designed to help organizations manage, secure, monitor and respond to endpoint threats from a single cloud-native platform.

The January 2027 goal is to deliver a production-quality Beta that can be:

- Demonstrated to enterprise customers
- Piloted with early adopters
- Presented to investors and accelerators
- Used as the foundation for the full commercial platform

---

# Engineering Principles

Every feature must satisfy the following before completion:

- Builds successfully
- Found 0 compilation errors
- Database migration succeeds
- Swagger documentation updated
- JWT authentication tested
- Authorization tested
- Git commit completed

No feature is considered complete until all checks pass.

---

# Backend Architecture

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│
├── docs/
│
├── src/
│
│   ├── common/
│   │
│   ├── config/
│   │
│   ├── database/
│   │
│   ├── modules/
│   │
│   └── main.ts
```

---

# Common Layer

```
common/

decorators/

guards/

middleware/

filters/

interceptors/

pipes/

utils/
```

Everything reusable belongs here.

No duplicated logic.

---

# Business Modules

Every business module must follow this structure.

```
module/

dto/

constants/

decorators/

guards/

service.ts

controller.ts

module.ts
```

---

# Authentication Flow

```
User

↓

JWT

↓

JwtStrategy

↓

JwtAuthGuard

↓

PermissionsGuard

↓

Controller
```

---

# Authorization Flow

```
User

↓

Organization

↓

Membership

↓

Role

↓

RolePermission

↓

Permission

↓

API
```

All authorization must be permission-based.

No hardcoded role checks.

---

# Database Design Principles

- UUID primary keys
- Soft delete where appropriate
- Proper indexes
- Cascading relationships
- Prisma migrations only
- Never modify production tables manually

---

# Sprint Roadmap

## Sprint 0.1

Authentication

JWT

Swagger

Users

Organizations

Status: Complete

---

## Sprint 0.2

Enterprise IAM

Permissions

Roles

Audit Logs

Seed Framework

Organization Membership

Status: In Progress

---

## Sprint 0.3

Endpoint Platform

Device Registration

Inventory

Heartbeats

Device Status

---

## Sprint 0.4

Windows Agent

Secure Registration

Telemetry

Policy Sync

---

## Sprint 0.5

Policy Engine

Endpoint Policies

Device Control

Firewall

USB

---

## Sprint 0.6

Threat Detection

Alerts

Scanning

IOC Matching

---

## Sprint 0.7

Dashboard

SOC Dashboard

Executive Dashboard

Reports

---

## Sprint 0.8

AI Security Assistant

Incident Summary

Endpoint Health

Recommendations

---

## Version 1.0

January 2027 Beta

Enterprise Demonstration

Pilot Customers

Investor Demonstrations

---

# Git Standards

Feature branches only.

Example:

feature/permissions

feature/roles

feature/endpoints

feature/agent

---

Commit examples:

feat(auth): implement jwt authentication

feat(rbac): add permission module

feat(endpoint): add device registration

fix(jwt): resolve validation issue

refactor(users): improve service architecture

---

# Coding Standards

- Clean Architecture
- SOLID Principles
- Single Responsibility
- Dependency Injection
- DTO Validation
- Swagger Documentation
- Enterprise Security Best Practices

---

# Beta Scope

The January 2027 Beta must include:

Authentication

Organizations

RBAC

Audit Logs

Endpoint Registration

Device Inventory

Heartbeat

Policies

Alerts

Dashboard

AI Endpoint Summary

Everything outside this scope is planned for post-beta releases.

---

# Long-Term Vision

Following the Beta:

- Windows Agent
- Linux Agent
- macOS Agent
- Advanced EDR
- Threat Hunting
- SOAR
- XDR
- Threat Intelligence
- Cloud Security
- Mobile Device Security
- AI Security Copilot