import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import "@stackflow/plugin-basic-ui/index.css";
import HomeActivity from "./activities/home";
import ChatActivity from "./activities/chat";
import MoodSelectionActivity from "./activities/mood-selection";
import ResultsActivity from "./activities/results";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import IngredientSelectionActivity from "./activities/ingredirent-selection";
import RecipeActivity from "./activities/recipe-detail";
import ResultLoadingActivity from "./activities/result-loading";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    HomeActivity,
    ChatActivity,
    MoodSelectionActivity,
    ResultsActivity,
    IngredientSelectionActivity,
    RecipeActivity,
    ResultLoadingActivity,
  },
  initialActivity: () => "HomeActivity",
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      routes: {
        HomeActivity: "/",
        ChatActivity: "/chat",
        MoodSelectionActivity: "/mood-selection",
        ResultsActivity: "/results",
        IngredientSelectionActivity: "/chat/ingredient-selection",
        RecipeActivity: "/recipe/:id",
        ResultLoadingActivity: "/loading",
      },
      fallbackActivity: () => "HomeActivity",
    }),
  ],
});
