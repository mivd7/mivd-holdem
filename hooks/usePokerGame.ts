import { NewGameMutation, PlayerInput, useNewGameMutation } from "@/types/generated/graphql";
import { UseMutateFunction } from "@tanstack/react-query";

type GameActions = {
    newGame: UseMutateFunction<
        NewGameMutation,
        unknown,
        { players: PlayerInput[] | PlayerInput },
        unknown
    >;
};

const usePokerGame: () => { game: NewGameMutation | undefined; actions: GameActions } = () => {
    const { mutate: newGame, data }  = useNewGameMutation({
        endpoint: '/api/graphql', // Replace with your actual endpoint if different
    });

    
    const actions = {
        newGame,
    }

    return {
        game: data,
        actions
    }
}

export default usePokerGame;