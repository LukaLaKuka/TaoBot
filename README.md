<div align='center'>

![Hu Tao Icon](https://cdn.discordapp.com/avatars/1129712001233465425/73a375aa04e79be6ef2c3a0a64cb80e7.webp?size=512)
# TaoBot

Greetings, adventurer! I am TaoBot, the master of the Wangsheng Funeral Parlor, the 77th generation of the Wangsheng Clan and the funniest Bot ever!

TaoBot it's a Bot that [Tomhuel](https://github.com/Tomhuel) is using to try Discord API Functionalities.

</div>

## How to invite?

To invite TaoBot just you have to click [here!](https://discord.com/api/oauth2/authorize?client_id=1129712001233465425&permissions=8&scope=bot)

## Use

This bot is free, if you want to use my code for your own bot you are free to use it 😁

## Documentation

### CLI 

This Bot has an special way to work with [Models](#models), so i did a little CLI to create easily Models:

```bash
node tao new Model <Model Name>
```

And this bot, to import succesfully the Slash Commands, i store all the commands in a specific [folder](./src/app/Commands/CommandList/).

```bash
node tao new Command <Command Name>
```

Anyways you can always check with `help` command.

```bash
node tao help
```

### Models

In this bot, Models have 3 folders:

```bash
. # Model Folder
├── DataSources # DataSources for our Entity
│   └── ModelDS.ts
├── Entity # Entity Definition
│   └── ModelEntity.ts
├── index.ts # Barrel File
└── Repositories # Repositories for our Entity
    └── ModelRepository.ts
```

#### Entity
We use the Entity just to set the entity of the model.

Example:
```typescript
export class UserEntity {
    protected name: string;
    protected username: string;

    constructor(name: string, username: string) {
        this.name = name;
        this.username = username;
    }
}
```

#### Repositories
Here we gonna set the minimal functions that any datasource should have. For example: `getUsers` `saveUser` ...

And we gonna use `RepositoryImplementation` as template to execute any DataSource.

Example:
```typescript
import { UserEntity } from '../Entity/UserEntity';

export abstract class UserRepository {
    abstract getUsers(): UserEntity[];
    abstract saveUser(user: UserEntity): Promise<boolean>;
}

export class UserRepositoryImplementation implements UserRepository {

    constructor(
        readonly UserDataSource: UserRepository
    );

    getUsers(): UserEntity[] {
        return this.UserDataSource.getUsers();
    }

    async saveUser(user: UserEntity): Promise<boolean> {
        const res = await this.UserDataSource.saveUser(user);
        return res;
    }
}
```

#### Datasource
Here there will be all the logic needed to handle with any Data Source (Database, Local Files, HTTP Fetching, etc).

Example:
```typescript
// Example reading and writing Local Files
import { UserEntity } from '../Entity/UserEntity';
import * as fs from 'node:fs';

export class UserFileSystemDS extends UserRepository {

    private readonly userFilePath = 'my/path.txt';

    getUsers(): UserEntity[] {
        const users = fs.readFileSync(this.userFilePath).split('\n').map((userText) => {
            const user = JSON.parse(userText);
            return new UserEntity(user.name, user.username);
        });
        return users;
    }

    async saveUser(user: UserEntity): Promise<boolean> {
        try {
            fs.appendFile(this.userFilePath, '\n' + JSON.stringify(user), { encoding: 'utf-8' });
            return true;
        } catch (err) {
            console.error(err.message);
            return false;
        }
    }
}
```
