# Service provider website
This is a website for a service provider. Service provider details are added in ServiceProvider.md

## Resources
- **info.json** - This file contains basic information about the service provider such as name, phone number, email, and address.
  - name: Brand under which service is provided
  - full_name: Name of the service provider (Individual or Company)
  - phone: Contact phone number
  - email: Contact email address
  - Other social media details are provided which will be displayed in the footer.
- **appointment_products.json** - This file contains details about the services offered and their pricing.
  - Note: Appointment product tap should take user to url: app.setav.ai/#/g/:gid/services/details/:pid. Where gid is the group id and pid is the product id.
- **Service.md** - This file contains detailed information about the service provider, including background, expertise, and approach.

## Actions
- **Book Appointment** - This action will take the user to the appointment booking page.
- **Call Now** - This action will initiate a phone call to the service provider's phone number.
- **Send Email** - This action will open the user's default email client to send an email.
- **Download vCard** - This action will download the service provider's contact information as a vCard file.
- **Login to setav** - This action will take the user to the setav login page.
- **Download setav App** - This action will take the user to the setav app download page.
  
## Section
- Hero
  - Title: Tagline for service provider
  - Heero image add a placeholder to be generated later.
- Images section
  - Images uploaded by service provider
- Why us section
  - Reasons to choose this service provider
- Services Offered
  - List of services offered by the service provider
- List of appointment products with pricing
- Contact section
  - Phone
  - Email
- Footer
  - Download vcf card
  - Social media links
  - Download setav app
    - App store
    - Play store