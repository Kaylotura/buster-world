"""Buster-world Views
This module contains the functions required to render Buster World's HTML as well as a function that takes in JSON
input and passes it to logic to create a new PlayerStats django model.
"""

from django.shortcuts import render
from . import logic
from . import settings

def render_start(request):
    """Renders the Start Page."""
    return render(request, 'buster-world/start_page.html')


def render_game(request):
    """Renders the Game Page. This function grabs the google API key from the python module named key.py"""
    template_arguments = {
        'KEY': settings.GOOGLE_MAPS_KEY
    }
    return render(request, 'buster-world/game_page.html', template_arguments)


def separate_by_top_ten(any_list):
    """Takes in a list as an argument and returns a dictionary with 'top' as a key, and the first 10 entries in a list
    as the value, and 'the_rest" as another key with a list of the remaining items as the value.

    >>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    >>> separate_by_top_ten(a)
    {'top': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'the_rest': [11, 12]}
    """
    return {
        'top': any_list[:10],
        'the_rest': any_list[11:]
            }


def render_high_scores(request):
    """Renders the High Score Page by retrieving the playerStats organized by score, and separated into two lists as
     defined by 'separate_by_top_ten' function.
     """
    player_stats = logic.get_player_stats_by_score()
    template_arguments = separate_by_top_ten(player_stats)
    return render(request, 'buster-world/high_score_page.html', template_arguments)


def return_score_submit(request):
    """Grabs the player data from the game-over ajax-call on the game page and passes it through a create and save
    function to add it to the PlayerStats class-model.
    """
    player_name = request.POST['name']
    player_score = request.POST['score']
    player_time = request.POST['time']
    logic.create_and_save_new_player_stat(player_name, player_score, player_time)
