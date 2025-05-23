# Acai Bowl Co. 

A web application that allows users to easily customize their acai bowls—from bowl size to a variety of toppings. It includes an admin panel where orders can be viewed and managed based on their status. 

## Getting Started

### Prerequisites
Before running the application locally, ensure you have the following installed and configured:
* [Node.js](https://nodejs.org/en) - to download and be able to run Next.js framework
* [Supabase](https://supabase.com/docs/guides/database/overview) - to learn how Supabaase Database works

### Installation
* Clone the repository
```
git clone <repository_url>
cd <project_folder>
```
* Install dependencies
```
npm install
```
* Configure environment variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=your_redirect_url_for_updating_password
```
* Run the application
```
npm run dev
```

### Application Access
To access the client and admin side of the application, navigate to: 
* http://localhost:3000 - for accessing customization of acai bowls
* http://localhost:3000/auth/login - for managing orders that have been created

### Reminders
This project heavily relies on a Supabase database and authentication as backend. Before running the application, you must have an active Supabase project with the appropriate database schema configured.

