import fs from "fs";

function openJSON<T>(filename: string): T[] {
    let data: T[] = [];
    try {
      data = JSON.parse(fs.readFileSync(filename, "utf-8")) as T[];
    } catch {
      throw new Error(`Error parsing file ${filename}`);
    }
  
    return data;
}

function saveJSON(data: any, fileName: string): void {
    let fileData: any[] = [];
    if (fs.existsSync(fileName)) {
      const existingData = fs.readFileSync(fileName, 'utf-8');
      try {
        fileData = JSON.parse(existingData) as any[];
      }catch (err) {
        throw new Error(`Error parsing file ${fileName}: ${err as string}`);
      }
      const isDuplicate = fileData.some((content) => content.id === data.id);
      if (isDuplicate) {
        return;
      }
    }
    fileData.push(data);
    try {
      fs.writeFileSync(fileName, JSON.stringify(fileData, null, 2));
      console.log(`Data saved to ${fileName}`);
    }catch (err) {
      throw new Error(`Error writing file ${fileName}: ${err as string}`);
    }
  }

export { openJSON, saveJSON };