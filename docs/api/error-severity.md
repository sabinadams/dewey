# Error Severity Reference

This document outlines the severity levels used for errors in Dewey.

## Overview

Errors in Dewey are assigned severity levels using the `ErrorSeverity` enum to help prioritize responses and determine appropriate handling strategies. The severity levels are:

1. **Critical**: System-wide impact requiring immediate attention
2. **Error**: Significant impact on core functionality
3. **Warning**: Moderate impact on non-critical features
4. **Info**: Minor impact with workarounds available

## Severity Levels

### Critical

**Definition:**
Errors that prevent core system functionality or pose significant security risks.

**Characteristics:**
- System-wide impact
- No workarounds available
- Requires immediate attention
- May affect multiple users

**Examples:**
- Database connection failures
- Authentication system failures
- Core service crashes
- Security breaches
- Data corruption
- System crashes

**Response Time:**
- Immediate response required
- 24/7 on-call escalation
- Incident response team activation

### Error

**Definition:**
Errors that significantly impact core functionality but have partial workarounds.

**Characteristics:**
- Major feature impact
- Limited workarounds available
- Requires prompt attention
- Affects multiple users

**Examples:**
- Payment processing failures
- Data synchronization issues
- Performance degradation
- Feature unavailability
- Validation failures
- Business rule violations

**Response Time:**
- Response within 4 hours
- Business hours escalation
- Priority bug fix

### Warning

**Definition:**
Errors that impact non-critical features or have clear workarounds.

**Characteristics:**
- Limited feature impact
- Clear workarounds available
- Scheduled attention
- Affects individual users

**Examples:**
- UI rendering issues
- Non-critical feature bugs
- Performance optimizations
- Minor data inconsistencies
- Deprecated feature usage
- Configuration warnings

**Response Time:**
- Response within 24 hours
- Regular bug fix cycle
- Feature team review

### Info

**Definition:**
Errors that have minimal impact and multiple workarounds.

**Characteristics:**
- Minor feature impact
- Multiple workarounds available
- Low priority attention
- Affects individual users

**Examples:**
- Cosmetic UI issues
- Documentation updates
- Minor usability improvements
- Non-blocking warnings
- Informational messages
- Status updates

**Response Time:**
- Response within 1 week
- Regular maintenance cycle
- Team backlog review

## Severity Selection Guidelines

When selecting an error severity:

1. Consider the impact on system functionality
2. Evaluate the availability of workarounds
3. Assess the number of affected users
4. Consider the urgency of resolution
5. Factor in security implications

## Severity Decision Matrix

```mermaid
graph TD
    A[Error Occurs] --> B{System Impact?}
    B -->|System-wide| C[Critical]
    B -->|Major Feature| D[Error]
    B -->|Minor Feature| E[Warning]
    B -->|Cosmetic| F[Info]
    C --> G[Immediate Response]
    D --> H[4 Hour Response]
    E --> I[24 Hour Response]
    F --> J[1 Week Response]
```

## Related Documentation

- [Error Types Reference](error-types.md)
- [Error Categories Reference](error-categories.md)
- [Error Handling Guide](../core-concepts/error-handling.md) 