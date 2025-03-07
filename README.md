
# Jira Integration with Next.js

This project is a Next.js application that integrates with Jira using its API. The setup involves obtaining an API token from your Jira domain, specifying the Jira domain, and providing the email associated with your Jira account.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine.
- A Jira account with access to the domain you want to integrate.
- An API token generated from your Jira account.

## Setup

1. **Clone this Repository**

2. **Install Dependencies**

   This project uses Yarn as the package manager. If you prefer npm, you can use that as well.

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root of your project and add the following variables:

   ```env
   JIRA_TOKEN=supersecrettoken
   JIRA_EMAIL=youremailfromjiradomain
   JIRA_DOMAIN=your-domain.atlassian.net
   ```

   Replace `supersecrettoken`, `youremailfromjiradomain`, and `your-domain.atlassian.net` with your actual Jira API token, email, and domain.

4. **Get Your Jira API Token**

   To generate a Jira API token, follow these steps:

   1. Log in to your Jira account.
   2. Click on your profile picture in the top-right corner and select **Account settings**.
   3. In the left-hand menu, click on **Security**.
   4. Under the **API token** section, click on **Create and manage API tokens**.
   5. Click on **Create API token**.
   6. Give your token a label (e.g., "Next.js Integration") and click **Create**.
   7. Copy the generated token and store it securely. You will not be able to see it again after closing the dialog.

5. **Run the Development Server**

   Start the development server using Yarn or npm:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

Once the development server is running, you can start interacting with the Jira API through url http://localhost:3000

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. We welcome any improvements or new features!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Jira for providing a robust API for integration.
- Next.js for making it easy to build React applications with server-side rendering.
``
