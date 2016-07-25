// function sum(num1, num2) {
//   return new Promise(function(resolve, reject) {
//     resolve(num1 + num2);
//   });
// }
//
// sum(1, 2).then(function(value) {
//   console.log('1st ' + value);
//   return sum(value, 1);
// }).then (function(newValue) {
//   console.log('2nd ' + newValue);
//   return sum(newValue, 1);
// }).then(function(newerValue) {
//   console.log('3rd ' + newerValue);
// });

// var $promise = Promise.resolve($.ajax('http://pokeapi.co/api/v2/pokemon/'));
function $ajaxPromise(url) {
  return Promise.resolve($.ajax(url));
}

$ajaxPromise('http://pokeapi.co/api/v2/pokemon/magikarp')
.then(function(value) {
  console.log(value);
  var abilityURL = value.abilities[0].ability.url;
  console.log(abilityURL);
  return $ajaxPromise(abilityURL);
}).then(function(pokesWithAbility) {
  console.log(pokesWithAbility);
  pokesWithAbility.pokemon.forEach(function(poke) {
    console.log(poke.pokemon.name);
  });
  return pokesWithAbility.pokemon[Math.floor(Math.random() * pokesWithAbility.pokemon.length)].pokemon.name;
}).then(function(randomName) {
  $ajaxPromise('http://pokeapi.co/api/v2/pokemon/' + randomName)
  .then(function(randomPoke) {
    $('body').prepend('<h1>' + randomName + '</h1><img src="' + randomPoke.sprites.front_default + '">');
  });
});

// $promise.then(function(result) {
//   console.log(result.name);
//   console.log($promise);
// });
