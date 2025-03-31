export function formatTimestamp(timestamp: string): string {
    const date = timestamp.split("T")[1];
    const hours = date.slice(0, 2);
    const minutes = date.slice(2, 4);

    return `${hours}:${minutes}`;
}