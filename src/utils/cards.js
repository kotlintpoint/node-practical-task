
function deal(players, numCards) {
    let deck = Array.from(new Array(52), (x, i) => {
      if(i<=12) return `Club-${i}`
      else if(i<=25) return `Diamond-${i-12}`
      else if(i<=38) return `Heart-${i-25}`
      else return `Spade-${i-38}`
    });
    altNaiveShuffle(deck)
    players.forEach(player => {
        player.hand=[]
      while(player.hand.length !== numCards) {
        player.hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
      }
    });
  }
  function altNaiveShuffle(deck) {
    let randomCard;
    let tempX;
    for (let index = deck.length - 1; index > -1 ; index -= 1) {
        randomCard = Math.floor(Math.random() * deck.length);
        tempX = deck[index];
        deck[index] = deck[randomCard];
        deck[randomCard] = tempX;
    }
}

// const players=[{hand:[]},{hand:[]}]
// deal(players,10)
// console.log(players)

module.exports = {
    deal
}

