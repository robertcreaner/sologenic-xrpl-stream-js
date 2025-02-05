"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineSigner = void 0;
const index_1 = require("./index");
const xrpl_1 = require("xrpl");
class OfflineSigner extends index_1.SologenicTxSigner {
    constructor(options) {
        super(options);
        this.signerID = 'offline';
        this.includeSequence = true;
    }
    requestConnection() {
        return true;
    }
    async sign(txJson, txId, account, signingOptions) {
        try {
            if (!this.wallet) {
                // const { publicKey, privateKey } = account.getKeypair();
                this.wallet = xrpl_1.Wallet.fromSeed(account.getSecret());
            }
            // txJson.SigningPubKey = this.wallet.publicKey;
            delete txJson.SigningPubKey;
            if (!signingOptions) {
            }
            // Sign the transaction using the secret provided on init
            // console.log(Signing transaction txJson=${txJson}, secret=${account.secret}, keypair=${account.keypair})
            // Delete the transaction metadata if it exists since the signing will fail
            // as this TransactionMetadata is not known to the schema.
            if (txJson.TransactionMetadata) {
                delete txJson.TransactionMetadata;
            }
            if (txJson.LastLedgerSequence)
                txJson.LastLedgerSequence = Number(txJson.LastLedgerSequence) + 1000;
            let signedTx = this.wallet.sign(JSON.parse(JSON.stringify(txJson)));
            // const signedTx: SologenicTypes.SignedTx = this.rippleApi.sign(
            //   JSON.stringify(txJson),
            //   account.getSecret(),
            //   signingOptions,
            //   account.getKeypair()
            // );
            signedTx.id = txId;
            return signedTx;
        }
        catch (error) {
            console.log('EROEROEROEORERER', error);
            throw error;
        }
    }
}
exports.OfflineSigner = OfflineSigner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc2lnbmluZy9vZmZsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG1DQUE0QztBQUM1QywrQkFBOEI7QUFFOUIsTUFBYSxhQUFjLFNBQVEseUJBQWlCO0lBTWxELFlBQVksT0FBWTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFIakIsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUszQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FDUixNQUF5QixFQUN6QixJQUFZLEVBQ1osT0FBb0IsRUFDcEIsY0FBb0I7UUFFcEIsSUFBSTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQiwwREFBMEQ7Z0JBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUNwRDtZQUVELGdEQUFnRDtZQUNoRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFFNUIsSUFBSSxDQUFDLGNBQWMsRUFBRTthQUNwQjtZQUVELHlEQUF5RDtZQUN6RCwwR0FBMEc7WUFFMUcsMkVBQTJFO1lBQzNFLDBEQUEwRDtZQUMxRCxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtnQkFDOUIsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUM7YUFDbkM7WUFFRCxJQUFJLE1BQU0sQ0FBQyxrQkFBa0I7Z0JBQzNCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRXZFLElBQUksUUFBUSxHQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ25DLENBQUM7WUFFRixpRUFBaUU7WUFDakUsNEJBQTRCO1lBQzVCLHlCQUF5QjtZQUN6QixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLEtBQUs7WUFFTCxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUVuQixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV2QyxNQUFNLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBbEVELHNDQWtFQyJ9