# InternCheck

> **Discover. Verify. Apply. Track.**

InternCheck is a full-stack internship discovery and verification platform designed to help students find opportunities, evaluate internship listings, and manage their application journey.

It brings students and recruiters together through separate portals, while providing automated risk assessment to help students identify potentially suspicious internship opportunities before applying.

**Live Demo:** https://interncheck-nu.vercel.app  
**Repository:** https://github.com/Ash5008X/Internship-Verification-Platform

---

## Table of Contents

- [Features](#features)
- [Student Portal](#student-portal)
- [Recruiter Portal](#recruiter-portal)
- [Internship Verification](#internship-verification)
- [Authentication and Email Verification](#authentication-and-email-verification)
- [Public Contact and Reporting](#public-contact-and-reporting)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Database Models](#database-models)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)

---

## Features

- Separate student and recruiter portals.
- Secure authentication using JWT and HTTP-only cookies.
- Email OTP verification for registered accounts.
- Internship discovery and filtering.
- Automated internship verification and risk assessment.
- Company profiles and verification information.
- Internal and external internship applications.
- Application tracking and status management.
- CV upload and management.
- CV access for recruiters handling applications.
- Internship bookmarking.
- Student internship experiences and feedback.
- Notifications.
- Public contact, support, and reporting forms with email delivery.

---

## Student Portal

The student portal provides tools to discover internships and manage applications.

### Dashboard

- Personalized student dashboard.
- Internship-related information and updates.
- Application overview.
- Relevant platform activity.

### Internship Discovery

Students can browse available internship listings and explore details such as:

- Internship title and description.
- Company information.
- Required skills.
- Stipend and duration.
- Work mode and location.
- Application method.
- Verification and risk information.

### Application Management

Students can:

- Apply to internal internship listings.
- Continue to external application pages.
- Track submitted applications.
- View application status.
- Withdraw eligible applications.

### Bookmarks

Students can save internship listings and access them later.

### CV Management

- Upload and manage CV documents.
- Maintain CV information.
- Use uploaded CVs during internship applications.
- Allow recruiters to access submitted application CVs through protected routes.

### Student Experiences

Students can share internship-related experiences and feedback, helping other students understand opportunities beyond their descriptions.

### Profile and Settings

Students can manage their profile information, educational details, and account settings.

---

## Recruiter Portal

Recruiters have a dedicated workspace for managing internship listings and applications.

### Recruiter Dashboard

Provides an overview of recruiter activity and internship-related information.

### Internship Management

Recruiters can:

- Create internship listings.
- View their internship listings.
- Manage existing listings.
- Update listing information.
- Manage listing availability and submission workflows.

### Application Management

Recruiters can:

- View applications received for their internships.
- Access applicant information.
- View submitted CVs through protected endpoints.
- Update application statuses.

### Company Profile

Recruiters can manage their company profile and related information.

### Student Feedback

Recruiters can view feedback associated with their internships and manage relevant feedback records.

---

## Internship Verification

InternCheck includes a rule-based verification and risk assessment system designed to identify potentially suspicious internship listings.

Rather than relying on a single unexplained trust score, the system evaluates individual risk indicators and produces an assessment.

### Verification Checks

The verification system includes checks related to:

- Company information.
- Company website availability.
- Company and contact information consistency.
- Application URL validation.
- Registration fee requirements.
- Training fee requirements.
- Security deposit requirements.
- Suspicious listing information.
- Duplicate listing indicators.
- Other configured risk rules.

### Risk Assessment

The risk engine evaluates configured rules and generates a structured assessment.

Assessment information can include:

- Risk score.
- Risk severity.
- Assessment outcome.
- Triggered rules.
- Explanations and observations.
- Supporting references.
- Assessment status.

### Assessment Outcomes

| Outcome | Meaning |
|---|---|
| `approved` | Listing meets the configured approval criteria |
| `needs_review` | Additional attention is required |
| `rejected` | Listing meets configured rejection criteria |

Risk severity and assessment outcome are separate pieces of information.

A listing's risk score should not be treated as an absolute guarantee that an internship is legitimate or fraudulent.

> **Disclaimer:** InternCheck provides verification signals based on available information. Students should independently verify important details before sharing personal information or accepting an internship.

---

## Authentication and Email Verification

InternCheck uses JWT-based authentication with HTTP-only cookies.

### Registration and Login

Separate registration flows are available for:

- Students.
- Recruiters.

Passwords are hashed using `bcryptjs`.

### Email OTP Verification

New accounts are required to verify their registered email address.

The verification workflow includes:

1. Account registration.
2. OTP generation.
3. OTP delivery through Gmail SMTP.
4. Six-digit OTP entry.
5. OTP validation.
6. Account activation after successful verification.

Additional protections include:

- OTP expiration.
- Resend cooldown.
- Resend rate limits.
- Invalid OTP rejection.
- Attempt limits.

The email verification system uses Nodemailer and Gmail SMTP.

---

## Public Contact and Reporting

InternCheck provides public-facing pages for users who need assistance or want to report concerns.

Available forms include:

- Contact Us.
- Technical Support.
- Report an Internship Listing.
- Report a Platform Issue.

Submissions are handled through a dedicated API endpoint and delivered to the configured InternCheck Gmail inbox.

The email includes the submitted information and uses the submitter's email address as the reply-to address.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| Frontend | React 19 |
| Language | JavaScript (ES6+) |
| Styling | Tailwind CSS 4 |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Email Delivery | Nodemailer |
| Email Provider | Gmail SMTP |
| File and Media Storage | Cloudinary |
| API Testing | Postman, Newman |
| Deployment | Vercel |
| Version Control | Git and GitHub |

---

## Application Architecture

InternCheck uses the Next.js App Router for both frontend pages and backend API endpoints.

```text
                    InternCheck
                         |
              +----------+----------+
              |                     |
         Frontend                Backend
              |                     |
       +------+------+       +------+------+
       |             |       |             |
    Student      Recruiter  Auth API    Business APIs
    Portal        Portal       |             |
       |             |         |             |
       +-------------+---------+-------------+
                             |
                       Service Layer
                             |
                +------------+------------+
                |            |            |
             MongoDB     Verification    Email
                         Engine          Service
                |            |            |
                +------------+------------+
                             |
                      Application Data
```

---

## Project Structure

```text
InternCheck/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (public)/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── support/
│   │   │   ├── report-issue/
│   │   │   ├── report-listing/
│   │   │   ├── verification/
│   │   │   └── ...
│   │   │
│   │   ├── (student)/
│   │   │   ├── home/
│   │   │   ├── internships/
│   │   │   ├── applications/
│   │   │   ├── bookmarks/
│   │   │   ├── experiences/
│   │   │   ├── feedback/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   │
│   │   ├── recruiter/
│   │   │   ├── dashboard/
│   │   │   ├── internships/
│   │   │   ├── applications/
│   │   │   ├── feedback/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── applications/
│   │   │   ├── bookmarks/
│   │   │   ├── cv/
│   │   │   ├── experiences/
│   │   │   ├── feedback/
│   │   │   ├── internships/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   ├── public/
│   │   │   ├── recruiter/
│   │   │   └── verification/
│   │   │
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── landing/
│   │   ├── layout/
│   │   ├── public/
│   │   ├── shared/
│   │   └── ...
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── auth/
│   │   ├── cloudinary/
│   │   ├── email/
│   │   ├── validations/
│   │   └── verification/
│   │
│   └── models/
│       ├── User.js
│       ├── Company.js
│       ├── Internship.js
│       ├── Application.js
│       ├── Bookmark.js
│       ├── CV.js
│       ├── EmailVerification.js
│       ├── Notification.js
│       ├── Report.js
│       ├── ReviewHistory.js
│       ├── RiskAssessment.js
│       ├── StudentExperience.js
│       └── VerificationRecord.js
│
├── postman/
├── scripts/
├── .env.example
├── package.json
└── README.md
```

---

## API Overview

The backend API is organized around authentication, student operations, recruiter operations, and verification.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/student` | Register a student |
| POST | `/api/auth/register/recruiter` | Register a recruiter |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/send-verification-otp` | Send or resend verification OTP |
| POST | `/api/auth/verify-email` | Verify email using OTP |

### Student
