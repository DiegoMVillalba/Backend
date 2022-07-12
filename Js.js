class User {
    constructor(name, lastName, books, pets ){
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName(){
        return `${this.name} ${this.lastName}`;
    }

    addPet(pet){
        this.pets.push(pet);
    }
    
    countPet(){
        return this.pets.length;
    }

    addBook(name, writer ){
        this.books.push({name, writer});
    }

    getBooksNames(){
        return this.books.map(book => book.name)
    }
}

const user = new User ('Diego', 'Villalba',
    [{name:'Name of the wind', writer:'Patrick Rothfuss'}],
    ['Lobo', 'Simón']    
);
console.log(user.getFullName())
console.log(user.countPet())
user.addPet('Ringo');
console.log(user.countPet())
console.log(user.pets)
console.log(user.getBooksNames())
user.addBook('Wise man Fear', 'Patrick Rothfuss');
user.addBook('Doors of stone', 'patrick Rothfuss');
console.log(user.getBooksNames())
