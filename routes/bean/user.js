class User{
    constructor(number,name,sex,age,user,password,phonenumber,identity,create_time){
        this.number =number;
        this.name =name;
        this.sex =sex;
        this.age =age;
        this.user =user;
        this.password =password;
        this.phonenumber =phonenumber;
        this.identity =identity;
        this.create_time =create_time;
    }
}

module.exports = User;