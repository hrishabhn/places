
from dotenv import load_dotenv
import os
from notion_client import Client

from maps import get_coordinates


load_dotenv('.env.local')

notion = Client(auth=os.getenv('NOTION_API_KEY'))

response = notion.databases.query(
    database_id=os.getenv('PLACES_PAGE_ID'),
    sorts=[{"property": "sort_name", "direction": "ascending"}],
    filter={"and": [
        # {"property": "public", "checkbox": {"equals": True}},
        # {"property": "name", "title": {"is_not_empty": True}},
        # {"property": "city", "select": {"is_not_empty": True}},

        {"property": "maps_id", "rich_text": {"is_not_empty": True}},
        {"or": [
            {"property": "lat", "number": {"is_empty": True}},
            {"property": "lon", "number": {"is_empty": True}},
        ]},
    ]},
)

for item in response['results']:
    print(f'-- {item["properties"]["name"]["title"][0]["plain_text"]} --')

    print(f'  Getting coordinates...')
    lat, lon = get_coordinates(item['properties']['maps_id']['rich_text'][0]['plain_text'])

    print(f'  Saving...')
    notion.pages.update(
        page_id=item['id'],
        properties={
            'lat': {'type': 'number', 'number': lat},
            'lon': {'type': 'number', 'number': lon},
        }
    )

    print('  Done!')
    print()
