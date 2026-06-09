const express=require('express');
const sqlite3=require('sqlite3').verbose();
const bodyParser=require('body-parser');
const app=express();

//Configuração do servidor.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());//Necessário para o carrinho de compras.
app.use(express.static('.'));//Serve seus arquivoss HTML, JS e CSS.

//Conexão com o banco de dados.
const db=new sqlite3.Database('./sissenai.db');

//Inicialização de tabelas.
db.serialize(()=>{
  //Tabela de clientes.
  db.run(`CREATE TABLE IF NOT EXISTS clientes(
    id INTEGER PRIMARY JEY AUTOINCREMENT,
    nome TEXT, 
    cpf TEXT,
    telefone TEXT
    )`);

//--ROTA DE CLIENTES--
app.post('/salvar-cliente',(req,res)=>{
  const{ nome,cpf,telefone}=req.body;
  db.run(`INSERT INTO clientes (nome, cpf, telefone) VALUES(?,?,?)`, [nome,cpf,telefone], (err)=>{
    if(err) return res.status(500).send(err.message);
    res.redirect('/clientes.html');
  });
});

app.get('/listar-clientes',(req,res)=>{
  db.all("SELECT*FROM clientes",[],(err,rows)=>{
    if(err)return res.status(500).json(err);
    res.json(rows);
  });
});
app.put('/alterar-cliente/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone } = req.body;
    const sql = `UPDATE clientes SET nome = ?, cpf = ?, telefone = ? WHERE id = ?`;

    db.run(sql, [nome, cpf, telefone, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
// * NOVA ROTA: Excluir cliente * | Acrescentar tudo
app.delete('/excluir-cliente/:id', (req, res) => {
    const { id } = req.params;
    
    db.run(DELETE FROM clientes WHERE id = ?, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
//Iniciar servidor
const PORT=3000;
app.listen(PORT,()=>{
  console.log('=================================================='
  console.log(`SISSENAI DISPONÍVEL EM: https://localhost:${PORT}`)   
  console.log('=================================================='
});
