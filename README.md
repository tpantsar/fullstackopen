# esimerkkipalautusrepositorio

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
