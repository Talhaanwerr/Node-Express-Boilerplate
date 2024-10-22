# Node-Express-Boilerplate

yarn install

npx sequelize-cli model:generate --name Announcement --attributes name:string

//////for overwrite
npx sequelize-cli model:generate --name Designation --attributes designation_name:string,description:string,type:string,isDeleted:boolean --force

npx sequelize-cli db:migrate