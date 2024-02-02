import fs from 'fs';

export default function getInstancesFromDirectory(fullPath: string): any[] {
    const instances: Function[] = [];

    fs.readdirSync(fullPath).forEach((fileName) => {
        const fileModule = require(`${fullPath}/${fileName}`)
        const classReference = [Object.values(fileModule)] as any

        instances.push(classReference[0][0])
    });

    return instances
}
