# Flowers-Online — Full-Stack Capstone Project: Implementation Plan

> **Document Type:** Technical Blueprint & Development Reference
> **Project Name:** Flowers-Online
> **Platform:** Java Full-Stack (Spring Boot + Angular)
> **Classification:** Internal – General Use

---

## Revision History

| Date     | Version | Description     | Author               |
|----------|---------|-----------------|----------------------|
| Aug-2020 | 1.0     | Initial Version | Java Full-stack Team |
| Apr-2023 | 2.0     | Update          | Java Full-stack Team |
| Aug-2024 | 3.0     | Update          | Java Full-stack Team |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Modules](#2-system-modules)
3. [Detailed Functional Requirements](#3-detailed-functional-requirements)
4. [UI Screen Specifications](#4-ui-screen-specifications)
5. [Product Categories](#5-product-categories)
6. [Technology Stack](#6-technology-stack)
7. [Other Mandatory Technical Requirements](#7-other-mandatory-technical-requirements)
8. [Mandatory vs Good-to-Have Functionalities](#8-mandatory-vs-good-to-have-functionalities)
9. [Deliverables Expected](#9-deliverables-expected)
10. [Development Phases & Execution Strategy](#10-development-phases--execution-strategy)
11. [Database Schema Overview](#11-database-schema-overview)
12. [API Design Guidelines](#12-api-design-guidelines)
13. [Miscellaneous Notes](#13-miscellaneous-notes)

---

## 1. Project Overview

**Flowers-Online** is a renowned online flower and seed store that enables customers to order flowers and bouquets for various occasions such as birthdays, anniversaries, Valentine's Day, sympathy events, grand openings, and more. The platform is known for its wide variety of bouquets in different sizes and price ranges. It has recently expanded its portfolio to include the sale of flower seeds.

### Business Goals

- Provide a seamless online shopping experience for flower bouquets and seeds.
- Support multiple occasions through well-organized product categories.
- Enable admin staff to manage the full product lifecycle and generate business reports.
- Deliver a responsive, device-independent, and fluid web application.

---

## 2. System Modules

The system is divided into **two primary modules**:

| Module              | Used By    | Purpose                                         |
|---------------------|------------|-------------------------------------------------|
| **Admin Module**    | Admin      | Manage products, locations, orders, and reports |
| **Customer Module** | End-User   | Browse, shop, checkout, contact, and review     |

> **Note:** There is only **one hardcoded Admin** account. Customers must NOT have access to admin-level operations.

---

## 3. Detailed Functional Requirements

### 3.1 Customer Module

The Customer module exposes the following navigation menus on the Home Page:

| Menu              | Description                                    |
|-------------------|------------------------------------------------|
| Account           | Login, Registration, Change Password           |
| Shop              | Browse products by category or all             |
| Cart              | View cart items and proceed to checkout        |
| Contact           | Send a message to the Flowers-Online team      |
| Locations         | View physical shop locations                   |
| Review/Feedback   | Submit a shopping experience review            |

#### 3.1.1 Home Page

- Displays a list of products with product images and descriptions.
- All navigation menus are accessible from the header.
- Browsing the site and exploring products does **not** require sign-in.

---

#### 3.1.2 ACCOUNT Menu

Clicking Account shows **three forms on the same page**:

**Form 1 — Existing Customer Login**
- Fields: `* Email`, `* Password`
- Action Button: `Login`

**Form 2 — New Customer Registration**
- Action Button: `Create Account` (navigates to registration form)
- Registration fields:
  - `* Title` (dropdown: Mr / Mrs / Ms)
  - `* First Name`
  - `* Last Name`
  - `* Email` (unique, used as primary key)
  - `* Password`
  - `* Confirm Password`
  - `* Phone`
  - `* City` (dropdown)
  - `* Country` (dropdown)
  - `☐ I have read T&C` (checkbox — mandatory)
  - Button: `Create New Account`
- All fields are mandatory. Client-side and server-side validations required.

**Form 3 — Change / Forgot Password**
- Triggered via `Forgotten Password?` link → shows `Change Password` button
- Change Password screen:
  - Field: `* Email`
  - Button: `Submit`
  - On submit: system sends a password-reset email to the registered address.

---

#### 3.1.3 SHOP Menu

Clicking Shop shows a **category carousel** with navigation arrows (← →):

- Available category cards: **All, Birthday, Love, Marriage, Grand-Opening, Sympathy, Get-well-soon**, etc.
- Each category displays a representative flower image and a label.
- A **"Shop Now"** button is available to display **all products** across all categories.
- Clicking a specific category shows only the products within that category.

**Product Listing Page:**
- Header shows: number of products found, view size toggle (`S→L` or `L→S`), and `Sort By` dropdown.
- **Sort Options:** New Arrivals, Price Low to High, Best Sellers, Price High to Low.
- Each product card shows: Product Image, Name, Price.

**Product Detail Page** (on clicking a product card):
- Shows: Product Image, Name of the Item.
- `Choose Size` section with selectable buttons:
  - `Small — ₹300`
  - `Medium — ₹500`
  - `Large — ₹800`
- Selecting a size updates the `Total` price dynamically.
- Button: `Add to Cart`

---

#### 3.1.4 CART Menu

- Cart menu label shows item count: e.g., `CART(0)`, `CART(2)`.

**Empty Cart View:**
- Message: *"Your Cart is empty"*
- Buttons: `Start Shopping` | OR | `Login`

**Cart With Items View** (one row per item):

| Column   | Details                              |
|----------|--------------------------------------|
| Image    | Thumbnail of selected item           |
| Name     | Product name                         |
| Size     | Selected size (e.g., Small)          |
| Quantity | `−` [qty input] `+` controls         |
| Price    | Line item price                      |
| Delete   | 🗑 Remove item from cart             |

- Bottom section shows: `Subtotal`
- Button: `Proceed to Checkout`

**Checkout Flow** (triggered by "Proceed to Checkout"):
1. **Sign-in / Sign-up** — Customer logs in OR creates a new account.
2. **Delivery Information** — Collect delivery address.
3. **Payment Options** — COD (Cash on Delivery), Credit Card, Debit Card.
4. **Confirmation** — A confirmation email is triggered to the customer upon successful order placement.

---

#### 3.1.5 CONTACT Menu

A contact form is displayed with the following fields:

| Field   | Type     | Required |
|---------|----------|----------|
| Name    | Text     | Yes      |
| Email   | Email    | Yes      |
| Message | Textarea | Yes      |

- Button: `Send Message`
- All fields are mandatory.
- On submission, the message is delivered to the Flowers-Online team.

---

#### 3.1.6 LOCATIONS Menu

- Displays a list of shop names in a collapsible / accordion-style list.
- Clicking on a shop name expands it to show:
  - Address of the Shop
  - Phone Number
- Example shops: Shop1 ▾, Shop2 ▾, Shop3 ▲ (expanded → Address + Phone), Shop4 ▾, Shop5 ▾.

---

#### 3.1.7 REVIEW / FEEDBACK Menu

- Allows customers to share their shopping experience.
- Form fields:
  - `Email ID` of the reviewer
  - `Rating` (1 to 5; **5 = Highly Satisfied**, **1 = Least Satisfied**)
  - `Review Message`
- Button: `Submit Review`
- On successful submission:
  - A success confirmation message is displayed to the customer.
  - An **email notification is triggered to the Admin**.

---

### 3.2 Admin Module

The Admin module allows the single hardcoded admin to manage the platform.

#### 3.2.1 Product Management

- **Upload New Products:**
  - Each product requires: Image, Description, Size options, Price per size.
  - Products are bouquets for different occasions and/or seeds of different plants.
- **Delete Existing Products:** Remove products from the catalogue.
- **Modify Products:** Update description, image, size, pricing, and category tags.
- **Tag / Categorize Products:**
  - Assign single or multiple categories (Birthday, Grand-Opening, Sympathy, etc.).
  - Categorize by attributes: size, price, new-arrival, best-selling.

#### 3.2.2 Shop Location Management

- Add, update, or remove physical shop locations.
- Each location record holds: Shop Name, Address, Phone Number.

#### 3.2.3 Contact / Inquiry Management

- View and manage contact messages submitted by customers.

#### 3.2.4 Reporting & Analytics

The Admin can view and download reports under **two main categories**:

**A. Product / Sales Reports:**

| Report Type                | Description                                                   |
|----------------------------|---------------------------------------------------------------|
| Daily / Weekly / Monthly   | Shows high/low sales periods across time                      |
| Category-based Sales       | Revenue and units by category (Birthday, Love, Sympathy, …)  |
| Best / Least Sellers       | Products ranked by sales volume                               |
| Inventory Report           | Product name per category + number of units available         |

**B. Customer Reports:**

| Report Type                  | Description                                    |
|------------------------------|------------------------------------------------|
| List of All Customers        | Full customer directory                        |
| Customers by City / Country  | Geographic distribution of customer base       |
| Customer Orders              | Order history per customer                     |

- Reports can be **visual** (bar charts, pie charts, etc.) in addition to tabular data.
- Reports should be **downloadable**.

---

## 4. UI Screen Specifications

> All screens below are based on approved wireframe mockups. Actual design and styling is at the developer's discretion.

| Screen                    | Key Elements                                                                        |
|---------------------------|------------------------------------------------------------------------------------|
| Home Page                 | Product grid with images + descriptions, top navigation bar                        |
| Account Page              | Login form (left) + Create Account / Forgot Password (right) on same page          |
| Registration Form         | Title dropdown, 8 input fields, T&C checkbox, Create Account button                |
| Change Password           | Email field + Submit button                                                         |
| Shop – Category View      | Category carousel (All, Birthday, Marriage…), Shop Now button                      |
| Shop – Product Listing    | Product count, S-L toggle, Sort By dropdown, product card grid                     |
| Product Detail            | Image, name, size selector (S/M/L with prices), dynamic total, Add to Cart         |
| Cart – Empty              | "Your Cart is empty", Start Shopping / Login buttons                               |
| Cart – With Items         | Table rows (image, name, size, qty ±, price, delete), subtotal, Proceed to Checkout|
| Checkout Flow             | Sign-in/up → Delivery info → Payment (COD/CC/DC) → Confirmation email              |
| Contact                   | Name, Email, Message textarea, Send Message button                                  |
| Locations                 | Collapsible shop list: Shop name → Address + Phone Number                          |
| Review / Feedback         | Email, Rating (1–5), Message, Submit button                                         |
| Admin – Product Upload    | Image upload, description, size, price, category tag selector                      |
| Admin – Reports           | Tabular + visual charts (bar/pie), date filter, download option                    |

---

## 5. Product Categories

The following categories are supported for product tagging and customer browsing:

| # | Category      |
|---|---------------|
| 1 | All           |
| 2 | Birthday      |
| 3 | Love          |
| 4 | Marriage      |
| 5 | Grand-Opening |
| 6 | Sympathy      |
| 7 | Get-well-soon |

> Additional categories can be added based on business expansion needs.

---

## 6. Technology Stack

| Layer          | Technology                                                           |
|----------------|----------------------------------------------------------------------|
| **Frontend**   | Angular (TypeScript) — No plain HTML/CSS-only solutions             |
| **Backend**    | Java — Spring Boot, Spring Data JPA, Hibernate, Spring Security     |
| **Database**   | In-memory DB: H2 / HSQL / Derby (configurable)                     |
| **Security**   | Spring Security + JWT (JSON Web Token)                              |
| **Testing**    | JUnit 5, Mockito                                                    |
| **Email**      | JavaMail with SMTP / JMS / Nodemail                                 |
| **Charts**     | Google Charts / Chart.js / Angular Charts                           |
| **API Docs**   | OpenAPI / Swagger Specification                                      |
| **Java SDK**   | JDK 17 (preferred over JDK 8)                                       |
| **Build Tool** | Maven (multi-module project)                                        |
| **Deployment** | Optional — Pivotal Cloud Foundry (PCF) / AWS                        |
| **Container**  | Optional — Docker / containerization if time permits                |

---

## 7. Other Mandatory Technical Requirements

1. **JWT Security:** All backend APIs must be secured using JWT. After successful authentication, the backend generates a JWT token. All subsequent frontend ↔ backend communication must use this token in the `Authorization: Bearer` header.

2. **Modular Architecture (Microservices-style Maven Multi-module):**
   - `model-library` — Entity/model classes as a standalone Maven module.
   - `persistence-library` — Repositories and JPA configuration as a standalone Maven module.
   - Both libraries are built independently and included as dependencies in all service modules.

3. **API Documentation:** All REST APIs must be exposed through the **OpenAPI / Swagger Specification** and accessible via Swagger UI.

4. **Error & Negative Scenario Handling:** The application must correctly handle error paths — validation failures, unauthorized access, resource not found, duplicate registration, empty cart checkout, etc.

5. **Test Coverage:** Test cases must target **≥ 85% code coverage** (measured with JaCoCo or equivalent tool).

6. **Validations:** All validations must be enforced at **both the Angular UI layer and the Spring Boot backend**.

7. **Containerization:** Application can be containerized using Docker if time permits.

8. **Responsive UI:** All screens must be responsive, device-independent, and fluid across desktop, tablet, and mobile viewports.

---

## 8. Mandatory vs Good-to-Have Functionalities

### Mandatory Functionalities *(Must be implemented)*

| #   | Functionality                          |
|-----|----------------------------------------|
| i   | Login / Registration implementation    |
| ii  | Entity Management                      |
| iii | Database and Persistence Management    |
| iv  | CRUD Operational Support               |
| v   | Email Functionality Implementation     |
| vi  | Validations and Error Handling         |
| vii | Frontend and Backend Integration       |

### Good-to-Have Functionalities *(Implement if time permits)*

| #   | Functionality                           |
|-----|-----------------------------------------|
| i   | Security (JWT) related implementations  |
| ii  | Unit / Integration Test Cases           |
| iii | Chart / Graphical Reporting             |
| iv  | Cloud Deployment (PCF / AWS)            |

---

## 9. Deliverables Expected

| # | Deliverable                                                                   |
|---|-------------------------------------------------------------------------------|
| a | **Design Documents** — Architecture diagrams, flow diagrams                  |
| b | **Database Schema / Structure** — ER diagram and table definitions            |
| c | **Working Solution** — Full source code for both frontend and backend         |
| d | **Output Screenshots Document** — Screenshots of all key functionalities     |
| e | **Test Cases Document** — Unit and integration test documentation            |

---

## 10. Development Phases & Execution Strategy

### Phase 1 — Foundation & Project Setup
- Initialize Maven multi-module project structure
- Create `model-library` module (entity/model classes)
- Create `persistence-library` module (repositories, JPA config)
- Setup H2 in-memory database with schema initialization scripts
- Configure Spring Boot parent application with shared dependencies
- Setup Angular workspace, routing scaffolding, and shared services

### Phase 2 — Authentication & Security
- Implement Customer registration API with all validations
- Implement Login API with JWT token generation
- Implement Spring Security JWT filter chain
- Implement Change Password flow with email trigger
- Build Angular Auth module: Login, Register, Change Password screens
- Guard protected routes using Angular Route Guards

### Phase 3 — Product & Category Management
- Design Product, ProductSize, and Category entity models
- Implement Admin APIs: Create, Read, Update, Delete products
- Implement category tagging logic (single/multi-category support)
- Build Admin UI: product upload form, product list with edit/delete
- Build Customer product listing with Sort and Filter support
- Build Product Detail page with size selector and dynamic price update

### Phase 4 — Shopping Cart & Checkout
- Implement Cart service (add, update quantity, remove items)
- Build Cart UI with dynamic item rows, quantity controls, subtotal
- Implement Checkout flow (delivery address, payment options selection)
- Trigger order confirmation email on successful checkout
- Implement Customer order history view

### Phase 5 — Supporting Customer Features
- Build Contact Us form with backend message persistence
- Build Locations page with accordion expand/collapse per shop
- Build Review/Feedback form + admin email notification trigger
- Implement email service integration (JavaMail / SMTP)

### Phase 6 — Admin Reports & Analytics
- Implement Sales Reports API (daily/weekly/monthly, by category)
- Implement Customer Reports API (full list, by city/country)
- Implement Inventory Report API (product count per category)
- Build Report UI with Chart.js / Angular Charts (bar + pie charts)
- Add report download (CSV / PDF) functionality

### Phase 7 — Testing, Validation & Polish
- Write JUnit + Mockito unit tests for all service layers
- Achieve ≥ 85% code coverage (verify with JaCoCo)
- Add complete negative scenario handling for all APIs
- Complete Angular client-side validation across all forms
- Add Swagger/OpenAPI annotations to all REST endpoints
- Verify responsive layout across screen sizes (desktop/tablet/mobile)

### Phase 8 — Deployment (Optional)
- Containerize application with Docker (Dockerfile + docker-compose)
- Deploy to cloud platform (PCF or AWS) if time permits

---

## 11. Database Schema Overview

### `customers`

| Column        | Type        | Notes                        |
|---------------|-------------|------------------------------|
| id            | BIGINT (PK) | Auto-generated               |
| email         | VARCHAR     | Unique, used as business key |
| title         | VARCHAR     | Mr / Mrs / Ms                |
| first_name    | VARCHAR     |                              |
| last_name     | VARCHAR     |                              |
| password_hash | VARCHAR     | BCrypt encoded               |
| phone         | VARCHAR     |                              |
| city          | VARCHAR     |                              |
| country       | VARCHAR     |                              |
| created_at    | TIMESTAMP   |                              |

### `products`

| Column      | Type        | Notes |
|-------------|-------------|-------|
| id          | BIGINT (PK) |       |
| name        | VARCHAR     |       |
| description | TEXT        |       |
| image_url   | VARCHAR     |       |
| created_at  | TIMESTAMP   |       |

### `product_sizes`

| Column     | Type        | Notes                  |
|------------|-------------|------------------------|
| id         | BIGINT (PK) |                        |
| product_id | BIGINT (FK) | → products.id          |
| size       | ENUM        | SMALL / MEDIUM / LARGE |
| price      | DECIMAL     |                        |
| stock_qty  | INT         |                        |

### `categories`

| Column | Type        | Notes                              |
|--------|-------------|------------------------------------|
| id     | BIGINT (PK) |                                    |
| name   | VARCHAR     | Birthday, Love, Marriage, etc.     |

### `product_categories` *(join table)*

| Column      | Type   | Notes             |
|-------------|--------|-------------------|
| product_id  | BIGINT | FK → products     |
| category_id | BIGINT | FK → categories   |

### `orders`

| Column           | Type        | Notes                            |
|------------------|-------------|----------------------------------|
| id               | BIGINT (PK) |                                  |
| customer_id      | BIGINT (FK) | → customers.id                   |
| order_date       | TIMESTAMP   |                                  |
| status           | VARCHAR     | PENDING / CONFIRMED / CANCELLED  |
| delivery_address | TEXT        |                                  |
| payment_method   | VARCHAR     | COD / CREDIT_CARD / DEBIT_CARD   |
| total_amount     | DECIMAL     |                                  |

### `order_items`

| Column          | Type        | Notes                      |
|-----------------|-------------|----------------------------|
| id              | BIGINT (PK) |                            |
| order_id        | BIGINT (FK) | → orders.id                |
| product_size_id | BIGINT (FK) | → product_sizes.id         |
| quantity        | INT         |                            |
| unit_price      | DECIMAL     | Price at time of purchase  |

### `reviews`

| Column       | Type        | Notes           |
|--------------|-------------|-----------------|
| id           | BIGINT (PK) |                 |
| email        | VARCHAR     | Reviewer email  |
| rating       | INT         | 1–5             |
| message      | TEXT        |                 |
| submitted_at | TIMESTAMP   |                 |

### `shop_locations`

| Column       | Type        | Notes |
|--------------|-------------|-------|
| id           | BIGINT (PK) |       |
| shop_name    | VARCHAR     |       |
| address      | TEXT        |       |
| phone_number | VARCHAR     |       |

### `contact_messages`

| Column      | Type        | Notes |
|-------------|-------------|-------|
| id          | BIGINT (PK) |       |
| name        | VARCHAR     |       |
| email       | VARCHAR     |       |
| message     | TEXT        |       |
| received_at | TIMESTAMP   |       |

---

## 12. API Design Guidelines

All REST APIs must:
- Be secured via **JWT Bearer Token** (except login/register endpoints).
- Follow **RESTful conventions** (proper use of GET, POST, PUT, DELETE).
- Return standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- Be documented via **OpenAPI / Swagger**.
- Return consistent JSON error bodies:

```json
{
  "timestamp": "2024-08-01T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists",
  "path": "/api/customers/register"
}
```

### Sample API Endpoint Reference

| Method | Endpoint                        | Description                       | Auth Required |
|--------|---------------------------------|-----------------------------------|---------------|
| POST   | `/api/auth/register`            | Customer registration             | No            |
| POST   | `/api/auth/login`               | Login — returns JWT               | No            |
| PUT    | `/api/auth/change-password`     | Change password via email         | No            |
| GET    | `/api/products`                 | List all products (with filters)  | No            |
| GET    | `/api/products/{id}`            | Get single product detail         | No            |
| GET    | `/api/categories`               | List all categories               | No            |
| POST   | `/api/admin/products`           | Admin: Add new product            | Admin JWT     |
| PUT    | `/api/admin/products/{id}`      | Admin: Update product             | Admin JWT     |
| DELETE | `/api/admin/products/{id}`      | Admin: Delete product             | Admin JWT     |
| POST   | `/api/orders`                   | Customer: Place an order          | Customer JWT  |
| GET    | `/api/orders/my`                | Customer: View order history      | Customer JWT  |
| POST   | `/api/contact`                  | Send contact message              | No            |
| GET    | `/api/locations`                | List all shop locations           | No            |
| POST   | `/api/reviews`                  | Submit review/feedback            | No            |
| GET    | `/api/admin/reports/sales`      | Admin: Sales reports              | Admin JWT     |
| GET    | `/api/admin/reports/customers`  | Admin: Customer reports           | Admin JWT     |
| GET    | `/api/admin/reports/inventory`  | Admin: Inventory report           | Admin JWT     |

---

## 13. Miscellaneous Notes

1. **Minimum Baseline:** The use cases described represent the **minimum required functionality**. Developers are encouraged to enrich the application beyond the baseline using domain knowledge and creativity.

2. **Single Hardcoded Admin:** There is only one Admin account (credentials hardcoded). Customers must never access admin-privileged endpoints or screens.

3. **Product Images:** Bouquet images can be sourced from public websites and stored as URLs or uploaded files on the server.

4. **Multi-Category Tagging:** A single product can belong to multiple categories simultaneously (e.g., a bouquet tagged as both "Birthday" and "Love").

5. **Error & Negative Scenarios:** Must include handling for: invalid credentials, duplicate registration email, out-of-stock items, empty cart checkout attempt, unauthorized API access, missing required fields, etc.

6. **Design Discretion:** The wireframe screens in the reference document are indicative only. Final UI design and layout decisions are at the developer/architect's discretion, provided all functional requirements are met.

7. **Responsive Design:** Angular's component model along with CSS Grid/Flexbox must ensure fluid UIs across desktop, tablet, and mobile viewports.

---

*End of Flowers-Online Implementation Plan*
*Generated from reference wireframes and requirements document — Java Fullstack Final Integration Capstone Project (v3.0, Aug-2024)*
