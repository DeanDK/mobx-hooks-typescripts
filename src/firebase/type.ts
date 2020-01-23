/** @format */

export abstract class FirebaseAbstractAPI {
    abstract login(email: string, password: string): Promise<firebase.auth.UserCredential>;
    abstract logout(): Promise<void>;
    abstract async register(name: string, email: string, password: string): Promise<void>;
    abstract isInitialized(): Promise<
        | firebase.Observer<any, Error>
        | (firebase.User | null)
        | firebase.auth.Error
        | (firebase.Unsubscribe | undefined)
    >;
}
