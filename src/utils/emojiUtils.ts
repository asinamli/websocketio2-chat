export const emojiMap: Record<string, string> = {
    ':smile:': '😊',
  ':laugh:': '😂', 
  ':heart:': '❤️',
  ':thumbs_up:': '👍',
  ':thumbs_down:': '👎',
  ':fire:': '🔥',
  ':rocket:': '🚀',
  ':star:': '⭐',
  ':clap:': '👏',
  ':wave:': '👋',
  ':ok:': '👌',
  ':love:': '😍',
  ':sad:': '😢',
  ':angry:': '😡',
  ':thinking:': '🤔',
  ':cool:': '😎',
  ':wink:': '😉',
  ':kiss:': '😘',
  ':party:': '🎉',
  ':coffee:': '☕'
};

export function convertEmojis(text: string): string {
  let convertedText = text;
  
  Object.entries(emojiMap).forEach(([code, emoji]) => {
    convertedText = convertedText.replace(new RegExp(code, 'g'), emoji);
  });
  
  return convertedText;
}

export function getAvailableEmojis(): string[] {
  return Object.keys(emojiMap);
}