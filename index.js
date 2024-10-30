// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.

// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.

// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.

const imageInput = document.getElementById("imageUpload");
const convertButton = document.getElementById("convertGrayscale");
const uploadedImage = document.getElementById("uploadedImage");
const grayCanvas = document.getElementById("grayscaleImage");
const ctx = grayCanvas.getContext("2d");

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage.src = e.target.result;
      uploadedImage.onload = function () {
        grayCanvas.width = uploadedImage.width;
        grayCanvas.height = uploadedImage.height;
        let textString = "Click the button to see the converted image",
          textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, grayCanvas.width / 2 - textWidth / 2, 100);
      };
    };
    reader.readAsDataURL(file);
  }
});

convertButton.addEventListener("click", function () {
  ctx.drawImage(uploadedImage, 0, 0);
  if (uploadedImage.src) {
    const imageData = ctx.getImageData(
      0,
      0,
      grayCanvas.width,
      grayCanvas.height
    );
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
      pixels[i] = grayscale;
      pixels[i + 1] = grayscale;
      pixels[i + 2] = grayscale;
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    alert("Please upload an image first");
  }
});
