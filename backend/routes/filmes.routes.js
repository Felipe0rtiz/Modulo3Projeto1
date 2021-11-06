const express = require('express');

const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: 'Luca',
        genero: 'Aventura',
        imagem: 'https://lumiere-a.akamaihd.net/v1/images/poster_002_ffcbf145.png',
        nota: '10',
    },
    {
        id: Date.now(),
        nome: 'Venom',
        genero: 'Ação/Ficção',
        imagem: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVxLXB4UpngxtMPNndsVI451JZ6TQSn3XejvWkUX3Bh80WKFlT',
        nota: '10',
    },
    {
        id: Date.now(),
        nome: 'Ron Bugado',
        genero: 'Animação',
        imagem: 'https://i2.wp.com/otageek.com.br/wp-content/uploads/2021/09/poster-ron-bugado-scaled.jpg?fit=1728%2C2560&ssl=1',
        nota: '10',
    },
]


router.get('/', (req, res) => {
    res.send(filmes);
})

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    if(!filme) {
        res.status(404).send({error: 'filme nao encontrado'});
        return;
    }

    res.send(filme);
})


router.post('/add', (req, res) => {
   
    const filme = req.body;



    if(!filme || !filme.nome || !filme.nota || !filme.imagem || !filme.genero) {
        res.status(400).send({
            message: 'filme inválido, porfavor preencha os campos'
        })
        return;
    }
    
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: `Cadastrado com sucesso: ${filme.nome}`,
        data: filme
    });
})


router.put('/edit/:id', (req, res) => {
    
    const filmeEdit = req.body;
    
    const idParam = req.params.id;
    
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O filme que voce está tentando editar nao foi encontrado'
        })
        return;
    }

    
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `${filmes[index].nome} foi atualizado com sucesso`,
        data: filmes[index]
    })
})



router.delete('/delete/:id', (req, res) => {
  
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
   
    filmes.splice(index, 1);
    res.send({
        message: `Excluido com sucesso: ${nome.nome} `,
    })
})

module.exports = router;