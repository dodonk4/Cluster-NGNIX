const getRandomInt = (max)=> {
    return Math.floor(Math.random() * max);
  }
const calculo = (numeroDeCalculo) => {
    let sum = 0
    for (let i = 0; i < numeroDeCalculo; i++) {
        sum+=(i + getRandomInt(1000));
    }
    return sum
}

export default calculo;