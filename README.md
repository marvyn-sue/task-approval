This is a full-stack web application where a manager can create tasks, assign them to users by email, and receive approvals or rejections through a unique tokenized email link. The manager can manage tasks via a dashboard.

Frontend: [NextJS]
Backend: [NextJS Api Routes]
Database: [Mongodb]

## 1. Create MongoDB Atlas (Cloud Database)

### Steps to Create a MongoDB Database on MongoDB Atlas:

1. **Sign Up for MongoDB Atlas**:

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.

2. **Create a Cluster**:

   - After signing in, click on **"Create a Cluster"**.
   - Choose the **free-tier cluster** (M0) for small projects.
   - Select a **cloud provider** (AWS, GCP, or Azure) and a **region** close to your user base.
   - Click **"Create Cluster"**.

3. **Create a Database User**:

   - Once the cluster is ready, go to **Database Access** under the **Security** tab.
   - Click **"Add New Database User"** and create a **username** and **password**.
   - Assign the user **Read and Write** permissions for the database.

4. **Create a Database**:

   - Go to the **Clusters** section, click on **Collections**.
   - Click **"Create Database"** and provide a **database name** and **collection name**.
   - MongoDB will create the database and collection for you when you insert the first document.

5. **Connect to MongoDB Atlas**:
   - In the **Clusters** page, click **"Connect"**.
   - Select **Connect via Application** to get the **connection string**.
   - The connection string looks like:
     ```bash
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```
   - Replace `<username>`, `<password>`, and `<dbname>` with your actual credentials.

## 2. Get mongodb SECRET KEY

- Add the **SECRET KEY** to the **.env** file, under **MONGO_URI**

## 3. Generate a JWT SECRET

- you can generate it on here [https://jwtsecret.com/generate](https://jwtsecret.com/generate), and add it on **.env** file under **JWT_SECRET**

## 3. Create a resend account

- [https://resend.com/login](https://resend.com/login), get the key, and add it on **.env** file under **RESEND_API_KEY**

## 4. ADD API_URL and FRONTEND_URL on .env

## 5. Install dependencies

```bash
npm install
```

## 5. Run seed to create the manager account

```bash
npm run seed
```

## 5. Run app on localserver

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can login using this credentials.
**const email = "admin@example.com"**
**const password = "securepassword123"**
