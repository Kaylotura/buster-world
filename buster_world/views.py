"""buster-world views"""

from django.shortcuts import render
from . import logic
from . import models

def render_start(request):
    """Renders the Start Page."""
    return render(request, 'buster_world/start_page.html')

def render_game(request):
    """Renders the Game Page."""
    return render(request, 'buster_world/game_page.html')

def render_high_scores(request):
    """Renders the High Score Page."""
    player_stats = logic.get_player_stats_by_score()
    template_arguements = logic.seperate_by_top_ten(player_stats)
    return render(request, 'buster_world/high_score_page.html', template_arguements)


def return_score_submit(request):
    """Grabs the player data from the game-over form on the game page and passes it through a create and save function
    to add it to the PlayerStats class-model, then redirects the user to the High Score Page.
    """
    print(request.POST)
    player_name = request.POST['player_name']
    player_score = request.POST['player_score']
    player_time = request.POST['player_time']
    logic.create_and_save_new_player_stat(player_name, player_score, player_time)
    return render_high_scores(request)
