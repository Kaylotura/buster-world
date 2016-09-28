"""Buster-world Views
This module contains the functions required to render Buster World's HTML and what information should be passed around.
"""

from django.shortcuts import render
from django.http import JsonResponse
from . import logic
from . import models
from . import key


def render_start(request):
    """Renders the Start Page."""
    return render(request, 'buster_world/start_page.html')


def render_game(request):
    """Renders the Game Page."""
    template_arguments = {
        'KEY': key.KEY
    }
    return render(request, 'buster_world/game_page.html', template_arguments)


def separate_by_top_ten(any_list):
    """Takes in a list as an arguement and returns a dictionary with 'top' as a key, and the first 10 entries in a list
    as the value, and 'the_rest" as anoter key with a list of the remaining items as the value.

    >>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    >>> seperate_by_top_ten(a)
    {'top': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'the_rest': [11, 12]}
    """
    return {
        'top': any_list[:10],
        'the_rest': any_list[11:]
            }


def _json_encode_player_stats(player_stats):
    """A private function that converts the PlayerStats model object to a JSON-encodable dict.

       >>> fairy_tale = models.PlayerStats(name='flames', score=7, time=2)
       >>> _json_encode_player_stats(fairy_tale)
       {'name': 'flames', 'score': 7, 'time': 2}
       """

    return {'name': player_stats.name, 'score': player_stats.score, 'time': player_stats.time}

def render_high_scores(request):
    """Renders the High Score Page."""
    player_stats = logic.get_player_stats_by_score()
    template_arguments = separate_by_top_ten(player_stats)
    return render(request, 'buster_world/high_score_page.html', template_arguments)


def return_score_submit(request):
    """Grabs the player data from the game-over form on the game page and passes it through a create and save function
    to add it to the PlayerStats class-model, then redirects the user to the High Score Page.
    """
    player_name = request.POST['name']
    player_score = request.POST['score']
    player_time = request.POST['time']
    logic.create_and_save_new_player_stat(player_name, player_score, player_time)