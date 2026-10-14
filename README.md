# Nature Caffe

A loyalty app for a fictional organic, vegan cafe. Guests collect a coffee bean stamp each visit, and ten beans give a free coffee. The app also shows the menu, the story of the cafe and contact details.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step.

## Screens

- **Hem**: stamp card with 10 coffee beans, progress bar and today's deal
- **Få stämpel**: the guest's QR code, scanned by staff at the till
- **Meny**: 17 dishes in four categories, all organic and vegan
- **Om oss**: the cafe's story and values
- **Kontakt**: address, phone, opening hours and social links

## Prototype notes

- Stamps are saved in the browser (localStorage). A real app would store them on a server and tie them to an account.
- "Simulera skanning" stands in for the staff scanning the QR code.
- "Återställ demo" on the home screen resets the card to 6 of 10.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `nature-caffe`.
2. Upload every file in this folder (`index.html`, `style.css`, `app.js`, `images/`).
3. Go to **Settings › Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the app is live at `https://<your-username>.github.io/nature-caffe/`.

## Bring it into Figma

Install the **html.to.design** plugin in Figma, paste the GitHub Pages link, and import at 390 px width. Each screen has its own link: add `#hem`, `#stampel`, `#meny`, `#om-oss` or `#kontakt` to the end of the address.

## Menu photos

Each dish can take a photo. In `app.js`, add `img: 'images/<file>.jpg'` to a dish, for example:

```js
{ name: 'Rödbetsbowl', desc: '…', price: 125, img: 'images/rodbetsbowl.jpg' }
```

Square images around 300 × 300 px work best.

## Design

- Colours: green `#4F6F5C`, gold `#D9A11B`, cream `#F5F1E8`, text `#3E4451`
- Fonts: Playfair Display (headings), Montserrat (body)
