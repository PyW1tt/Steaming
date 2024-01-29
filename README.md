# Movie Streaming Project
- Before Login

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/974302e1-4467-4f67-8a72-928132cbf045)

- After Login

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/602fbb46-bf89-4c61-a7cd-895e08c69b4b)


## Introduction
This project is a web-based movie and series streaming platform.

* responsive desktop only 

## How to Use
1. Clone the project to your local machine.
2. Integrate the terminal to both the server and client directories.
3. Run `npm i` to install the required node_modules.
4. Run `npm run dev` at the client directory to start the web interface.
5. Run `npm run start` to start the server. **Before running, go to `server/package.json` and remove line 20 ("prestart": "chmod +x ./node_odules/.bin/nodemon")**
6. In the `server/db.js` file, ensure you have a cloud database set up to store data. (See [Supabase Documentation](https://supabase.com/docs/reference/javascript/installing))
7. In the `server/routers/payment` file, you need a key for subscription. (See [OPN API Documentation](https://docs.opn.ooo/th/thailand#part-814562e94e354eda))
8. In the `client/app.tsx` file, change the port value to `http://localhost/4000`.
   
## Features
1. **Authentication:**
   - Users can log in, log out, and register.
   - Payment gateway system for subscription.
     
![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/b975aa33-ee71-43b5-8758-975c5b481216)  

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/cbe890de-7489-4e07-8a3d-8dc8c8fca917)

Debit card number can use

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/4bd296e6-22a6-4c35-b516-ccfca2f44e61)

(See [Omise Documentation](https://docs.opn.ooo/th/api-testing/thailand)) 

2. **User System:**
   - Users can select movies to watch or add them to their watchlist.
     
![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/fbc77c67-94b4-4f6e-b87f-b5ae06afd346)
![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/7282bf65-0973-4c11-aaaa-516173851144)

3. **Movie/Series Details:**
   - Display detailed information about movies and series, including title, creators, cast, and synopsis.
     
![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/83b33a28-a0a6-4bdf-b5fa-4cc1b4aff778)
![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/425d695c-1530-4c09-9fac-82da1b50b028)

4. **Genres:**
   - Users can search for movies based on genres.

   ![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/3d40f320-b86d-49fa-b0d5-dad57aecdc93)

5. **Search:**
   - Users can search for movies by entering the name, creators, or desired category.

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/d29e9d7f-5afb-4727-9f2b-6e4e9e86bc54)

6. **Admin System:**
   - Admins can create, edit, and delete movies and series.

for Admin role

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/1f51ac66-4fb8-4a01-addc-a6910317c083)

Admin page

![image](https://github.com/PyW1tt/sideProjectByTypeScript/assets/136727247/45cf00d2-34af-4a04-9fba-e150a0f8b22a)

## Tech Stack
- Frontend: React, Tailwind CSS, shadcn/ui, Formik
- Backend: Node.js, Express.js
- Cloud Database: PostgreSQL, Supabase

## Contact
For testing the admin system, please contact panyawit.sea@gmail.com

## Disclaimer
This project is created for code development purposes and does not intend to violate any copyrights.
