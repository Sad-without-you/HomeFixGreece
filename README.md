# HomeFix Greece

A platform connecting customers with home service professionals in Greece. Built as a static site using Jekyll, HTML, CSS, and JavaScript.

## Overview

HomeFix Greece is a platform where:

- Customers can book home services (cleaning, plumbing, electrical work, etc.)
- Professionals can register to offer their services
- Payments are processed securely
- Everything works with zero development costs

## Technologies Used

- **Frontend**: HTML, CSS (Tailwind CSS via CDN), JavaScript
- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages (free)
- **Forms**: Netlify Forms (free tier)
- **Database**: Airtable (free tier)
- **Payments**: Stripe
- **Automation**: Zapier (free tier)
- **SMS Notifications**: Twilio (free tier for testing)

## Setup Instructions

### 1. GitHub Repository and GitHub Pages

1. Create a new GitHub repository
2. Push this code to your repository
3. Go to the repository settings
4. Under "Pages", select the main branch as the source
5. Your site will be published at `https://[your-username].github.io/[repo-name]/`

### 2. Netlify Forms Setup

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Connect your GitHub repository to Netlify
3. Go to the Forms section in your Netlify dashboard
4. The forms are already configured in the HTML with the `data-netlify="true"` attribute
5. Forms will be automatically detected once the site is deployed

### 3. Airtable Setup

1. Create an Airtable account at [airtable.com](https://airtable.com/)
2. Create a new base with two tables:
   - **Bookings**: With fields for name, phone, email, service, location, date, price
   - **Providers**: With fields for name, phone, email, service, location, min_price, experience, description, verified (checkbox)
3. Note your API key and base ID for Zapier integration

### 4. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com/)
2. Set up your business details and payment methods
3. Create a payment link template that you'll use for customer bookings
4. Note your API keys for Zapier integration

### 5. Zapier Automation Setup

1. Create a Zapier account at [zapier.com](https://zapier.com/)
2. Create the following Zaps:

#### Booking Flow Zap:

- **Trigger**: New form submission in Netlify (booking form)
- **Action 1**: Create a record in Airtable (Bookings table)
- **Action 2**: Find provider in Airtable (match service, location, and check if price >= min_price)
- **Action 3**: Send SMS via Twilio to the provider
- **Action 4**: Send email confirmation to customer

#### Provider Registration Zap:

- **Trigger**: New form submission in Netlify (register form)
- **Action**: Create a record in Airtable (Providers table)

### 6. Twilio Setup (for SMS)

1. Create a Twilio account at [twilio.com](https://www.twilio.com/)
2. Get a Twilio phone number
3. Note your Account SID and Auth Token for Zapier integration

## Managing the Platform

### Verifying Professionals

1. When a professional registers, they will be added to your Airtable database
2. Call them to verify their information and qualifications
3. In Airtable, mark them as "verified" once you've confirmed their details

### Processing Bookings

1. When a booking is submitted, the automation will find a suitable professional
2. The professional will receive an SMS about the new booking
3. Once they confirm, send a Stripe payment link to the customer
4. After payment, the professional will be notified to proceed with the service

### Invoicing and Tax Compliance

1. For each successful booking, a 10% commission is retained by the platform
2. Invoices for this commission should be issued to service providers
3. For professional providers: Use the invoice template (`/docs/invoice_template.txt`)
4. For non-professional providers: Advise them to use the receipt template (`/docs/receipt_template.txt`)
5. Tax guides are provided to help non-professional providers understand their obligations:
   - Greek version: `/docs/tax_guide_gr.txt`
   - English version: `/docs/tax_guide_en.txt`
6. All financial records should be kept for at least 7 years (Greek tax requirement)
7. myDATA integration (for production): Set up API connection to automatically submit invoices to AADE

### Marketing and Growth

For organic growth without advertising costs:

1. Create social media accounts (Facebook, Instagram)
2. Join local community groups and share your service
3. Create QR code flyers to place in apartment buildings, cafes, etc.
4. Encourage customers and professionals to share their experiences

## Customization

### Adding New Services

1. Update the service options in the HTML forms in `services.html` and `register.html`
2. Update the service prices in `js/scripts.js`

### Translation

The site is set up with bilingual support (Greek/English):

- Content is marked with `data-lang-el` and `data-lang-en` attributes
- The language switcher in the header allows users to toggle between languages

## Cost Structure

- **Platform Fee**: 10% of each booking
- **Stripe Fees**: 1.4% + 0.25€ per transaction
- **All Other Costs**: Free (using free tiers of services)

For example, on a 50€ booking:

- Customer pays: 50€
- Platform fee (10%): 5€
- Stripe fee (approx): 0.95€
- Professional receives: 44.05€

## Scaling Up

As your platform grows:

1. Upgrade Netlify Forms when exceeding the free tier limits
2. Upgrade Airtable when exceeding the free tier record limits
3. Upgrade Zapier when exceeding the free tier task limits
4. Move from Twilio test mode to production

## Legal Compliance

- The website includes GDPR-compliant privacy policy
- Terms of service are provided according to Greek law
- Ensure you register your business properly in Greece and consult with a tax advisor

## Support and Contact

For questions or issues with the platform:

- Phone: +30 691 234 5678
- Email: info@homefixgreece.gr

## License

This platform is provided for your personal use only. Redistribution or commercial resale of this code is not permitted.

## myDATA Integration Guide

The Greek tax authority (AADE) requires electronic submission of invoices through the myDATA platform. Here's how to set it up:

### Setup for Testing

1. Create a test account at the [AADE myDATA Testing Environment](https://mydata-dev.azure-api.net/)
2. Generate API credentials for testing
3. Use InvoiceXpress or similar service that supports myDATA integration
4. Configure the service with your test API credentials

### Going Live

When ready to go into production:

1. Register for the [live myDATA platform](https://www.aade.gr/mydata)
2. Update your API credentials in your invoice management system
3. Ensure that all invoices issued are properly submitted to myDATA

### Automated Workflow Using Zapier

You can automate the invoicing process:

1. Create a Zap that triggers when a booking is completed (payment received)
2. Action 1: Calculate 10% commission amount
3. Action 2: Create invoice in InvoiceXpress (or similar tool)
4. Action 3: Submit invoice to myDATA via the InvoiceXpress API

### Important Tax Notes

1. For providers with VAT registration: Use VAT reverse charge mechanism
2. For non-VAT registered providers (small businesses or non-professionals): Invoice without VAT
3. Always include the provider's tax ID (ΑΦΜ) and your company's tax ID on invoices
4. Maintain copies of all invoices for at least 7 years
