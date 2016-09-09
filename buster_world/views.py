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

def return_score_sumbit(request):
    pass