const words = [
    "Windows",
    "Unix",
    "Homebew Computer Club",
    "Torvalds",
    "Linux",
    "Commodore",
    "IBM",
    "Tanenbaum",
    "Floppy-Disk",
    "Minix",
    "Diskette",
    "Apple",
    "Bill Gates",
    "Lovelace",
    "Silicon Valley",
    "Microsoft"
];

module.exports = () => {
    return words[Math.floor(Math.random() * words.length)];
};
