# ChessSrs CLI

This NodeJS CLI app implements a subset of the ChessSrs functionality described [here](https://github.com/jacokyle01/chess-srs)

# Features

- Add multiple "subrepertoires" from PGN strings
- Learn openings
- Recall openings

# Usage

## Adding a repertoire

### Add PGN

`add`\
`1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. g3`

### Select PGN

`select`\
`0`

## Training a repertoire

### Learning

`next`\
Type "next" until there are no more trainable positions

### Recalling

Switch to recall\
`toggle`\
`next`

Guess the move
--> enter a move in valid SAN (case-sensitive)\
`d4`

Continue recalling\
`next`\
`[guess]`
