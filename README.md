## Full Stack Open course repository

### [Part 9 - Typescript](https://fullstackopen.com/en/part9)

[Patientor frontend](https://github.com/tpantsar/patientor)

[Patientor Express server](https://github.com/tpantsar/fullstackopen/tree/main/part9-typescript/patientor-server)

### [Part 11 - CI/CD](https://fullstackopen.com/en/part11) 

[Pokedex](https://github.com/tpantsar/full-stack-open-pokedex) 

[Bloglist](https://github.com/tpantsar/fullstackopen-bloglist-cicd) 

### [Part 12 - Containers](https://fullstackopen.com/en/part12) 

[part12-containers](https://github.com/tpantsar/fullstackopen/tree/main/part12-containers) 

[Docker Bloglist](https://github.com/tpantsar/fullstackopen/tree/main/part12-containers/bloglist-docker) 

[Docker Todo App](https://github.com/tpantsar/fullstackopen/tree/main/part12-containers/todo-app) 

---

## Uusi React-projekti

```
npm create vite@latest part1 -- --template react
cd part1
npm install
npm run dev
```

Eräs varsin toimiva hakemistorakenne palautusrepositoriolle on tässä esimerkkirepositoriossa käytetty tapa, jossa kutakin osaa kohti on oma hakemistonsa, joka vielä jakautuu tehtäväsarjat (kuten osan 1 unicafe) sisältäviin hakemistoihin:

```
osa0
osa1
  kurssitiedot
  unicafe
  anekdootit
osa2
  puhelinluettelo
  maiden_tiedot
```

Hakemistoon kannattaa sijoittaa koko tehtäväsarjan react-projekti lukuunottamatta riippuvuuksia sisältävää hakemistoa <i>node_modules</i>
