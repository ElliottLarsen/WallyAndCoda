# Wally and Coda

Wally and Coda is a full-stack web application built with [FastAPI](https://fastapi.tiangolo.com/) and [React](https://react.dev/) that helps users manage veterinary appointments for their dogs.

## Technologies
- Python
- FastAPI
- JavaScript
- React
- HTML/CSS
- SQLite

## Key Features

### User Management:
- Users use username, password, first name, last name, and email address to create an account.
- Passwords must be entered twice and match to create an account.
- Email addresses and usernames are unique.
- Users can update their account information.

### Pup Management:
- Each user can create pup profiles with pup's name, sex, microchip number, AKC registration number, and AKC registration name.
- Microchip number, AKC registration number, and AKC registration name are unique.
- Individual pup profiles can be removed.

### Record Management:
- Users can select a pup and create a vet visit record for the specific pup.
- Records can be created using record type, record date, doctor's name, address, and phone number of the vet clinic, and additional notes.
- As with the pup profiles, individual records can be removed.

## GIF Walkthroughs

### User Registration and Authentication
<p>
<image src='gifs/register-loginout.gif' width=900><br>
</p>

- Users can create an account.
- When a user logs in using their login credentials, a JWT token is stored in the web browser's local storage.
- When a user logs out, the token is removed from the web browser's local storage.

### User Account Update
<p>
<image src='gifs/user-update.gif' width=900><br>
</p>

- Users can update their account information.
- New account details are applied upon the next login.

### Pup Profile Create and Remove
<p>
<image src='gifs/pup-crud.gif' width=900><br>
</p>

- Users can create their pup profiles.
- Detailed information of each pup is accessible by clicking on the pup's name.
- Users can remove individual pup profiles.

### Vet Visit Record Create and Remove
<p>
<image src='gifs/record-crud.gif' width=900><br>
</p>

- Users can create vet visit records for each pup.
- If a pup is removed, its records are removed as well.
- Users can remove individual records.

## Contact
Elliott Larsen
- Email: elliottlrsn@gmail.com
- GitHub: [@elliottlarsen](https://github.com/elliottlarsen)
- LinkedIn: [@elliottlarsen](https://www.linkedin.com/in/elliottlarsen)
