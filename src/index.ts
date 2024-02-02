import { TaoService } from "./app/TaoService";

(async () => {
    await main();
})();

async function main() {
    await TaoService.run();
}