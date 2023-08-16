import sqlite3 from 'sqlite3';


/*

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
});
*/



export function HenrietteSqlite(databasePath){

  this.databasePath = databasePath;
  this.db = new sqlite3.Database(databasePath);

  this.init = function(callback){
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS Entity (type TEXT, comment TEXT)");
      this.db.run("CREATE TABLE IF NOT EXISTS EntityField (entityId NUMBER, key TEXT, value TEXT, source TEXT)", callback);
    });
  }

  this.newEntity = function(type, comment, callback){
    const stmt = this.db.prepare("INSERT INTO Entity VALUES (?, ?)");
    stmt.run(type, comment);
    stmt.finalize(error => {
      console.log("finalized", error);
      callback()
    });
  }
  
  this.updateEntity = function(type, comment, callback){
  
  }
  
  this.setEntityField = function(id, field, value, variant, callback) {
  
  }
  
  this.list = function(type, callback){
  
  }
  
  this.show = function(id, callback){
  
  }
  
  this.search = function(type, callback){
  
  }
  
  this.tree = function(id, callback){
  
  }
  

}













