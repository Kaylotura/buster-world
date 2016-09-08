"""buster-world views"""

from django.shortcuts import render


def render_start(request):
    """Renders the Start Page."""
    return render(request, 'buster_world/start_page.html')

def render_game(request):
    """Renders the Game Page."""
    return render(request, 'buster_world/game_page.html')

def render_high_scores(request):
    """Renders the High Score Page."""
    return render(request, 'buster_world/high_score_page.html')
