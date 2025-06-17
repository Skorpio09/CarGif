const session = pl.create();

const knowledge = `
car(ferrari).
car(tesla_model_s).
car(hummer).
car(lamborghini).
car(bmw_i8).
car(toyota_prius).
car(rolls_royce).
car(jeep_wrangler).

sports_car(ferrari).
sports_car(lamborghini).
sports_car(bmw_i8).

electric(tesla_model_s).
electric(bmw_i8).
electric(toyota_prius).

big(hummer).
big(jeep_wrangler).

luxury(rolls_royce).
luxury(bmw_i8).

is_sports_car(X) :- sports_car(X).
is_electric(X) :- electric(X).
is_big(X) :- big(X).
is_luxury(X) :- luxury(X).
`;

session.consult(knowledge);

const carAnimations = {
  ferrari: '<img src="https://i.pinimg.com/originals/f4/19/71/f4197161f1e619baa30fd753eec7b154.gif" class="animal-gif" alt="Ferrari" />',
  tesla_model_s: '<img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/c7146a106634285.5f945bfe5ac20.gif" class="animal-gif" alt="Tesla" />',
  hummer: '<img src="https://media.tenor.com/0JLwzRNiZ8gAAAAM/hummer-off-road.gif" class="animal-gif" alt="Hummer" />',
  lamborghini: '<img src="https://media1.giphy.com/media/jePjAdmCogqys/giphy.gif" class="animal-gif" alt="Lamborghini" />',
  bmw_i8: '<img src="https://i.pinimg.com/originals/f6/50/18/f65018746700c91883fc704e9e458e50.gif" class="animal-gif" alt="BMW i8" />',
  toyota_prius: '<img src="https://i.pinimg.com/originals/88/47/92/884792ebb20f9447948900070c715f90.gif" class="animal-gif" alt="Toyota Prius" />',
  rolls_royce: '<img src="https://i.pinimg.com/originals/3e/cd/61/3ecd617fa2dc3249e6e214eac60f5501.gif" class="animal-gif" alt="Rolls Royce" />',
  jeep_wrangler: '<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/d86cde115266273.604aeeee392a3.gif" class="animal-gif" alt="Jeep Wrangler" />'
};

function runProlog() {
  const input = document.getElementById("prolog-input").value.trim();
  const resultDiv = document.getElementById("result");
  const animDiv = document.getElementById("animal-animation");

  resultDiv.innerHTML = "";
  animDiv.innerHTML = "";

  if (!input.endsWith(".")) {
    resultDiv.innerHTML = "<p>❗ Заявката трябва да завършва с точка.</p>";
    return;
  }

  try {
    session.query(input);
    session.answers(answer => {
      if (answer === false || answer === null) {
        resultDiv.innerHTML += "<p>🚫 Няма резултати за тази заявка.</p>";
        return;
      }

      const str = pl.format_answer(answer);
      resultDiv.innerHTML += `<p>✅ ${str}</p>`;

      const match = str.match(/X = (\w+)/);
      if (match) {
        const car = match[1];
        if (carAnimations[car]) {
          animDiv.innerHTML += `<div class="gif-block">${carAnimations[car]}<div class="car-label">${car}</div></div>`;
        } else {
          animDiv.innerHTML += `<div class="gif-block"><p>❔ Няма GIF за <strong>${car}</strong>.</p></div>`;
        }
      }
    });
  } catch (err) {
    resultDiv.innerHTML = `<p>⚠️ Грешка в заявката: ${err.message}</p>`;
  }
}
