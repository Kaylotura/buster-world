"""buster-world views"""

from django.shortcuts import render
from . import logic
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


def seperate_by_top_ten(any_list):
    """Takes in a list as an arguement and returns a dictionary with 'top' as a key, and the first 10 entries in a list
    as the value, and 'the_rest" as anoter key with a list of the remaining items as the value.

    >>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    >>> seperate_by_top_ten(a)
    {'top': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'the_rest': [11, 12]}
    """
    return {
        'top': any_list[:10],
        'the_rest': any_list[10:]
            }


def render_high_scores(request):
    """Renders the High Score Page."""
    player_stats = logic.get_player_stats_by_score()
    template_arguments = seperate_by_top_ten(player_stats)
    return render(request, 'buster_world/high_score_page.html', template_arguments)


def return_score_submit(request):
    """Grabs the player data from the game-over form on the game page and passes it through a create and save function
    to add it to the PlayerStats class-model, then redirects the user to the High Score Page.
    """
    print(request.POST)
    player_name = request.POST['player_name']
    player_score = request.POST['player_score']
    player_time = request.POST['pl' \
                               'ayer_time']
    logic.create_and_save_new_player_stat(player_name, player_score, player_time)
    return render_high_scores(request)
